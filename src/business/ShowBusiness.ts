import { ShowDatabase } from "../database/ShowDatabase";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { RequestError } from "../errors/RequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { IBuyTicketInputDTO, ICancelTicketDBDTO, IGetShowsDBDTO, IGetShowsInputDTO, IShowInputDTO, Show } from "../models/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase = new ShowDatabase(),
        private authenticator: Authenticator = new Authenticator(),
        private idGenerator: IdGenerator = new IdGenerator()
    ) { }

    createShow = async (input: IShowInputDTO) => {
        const { token, band, startsAt } = input;

        if (!token) {
            throw new RequestError("Missing token");
        }

        if (!band) {
            throw new RequestError("Missing data");
        }

        if (!startsAt) {
            throw new RequestError("Missing data");
        }

        if (startsAt < new Date("2022-12-05") || startsAt > new Date("2022-12-11")) {
            throw new RequestError("Invalid date");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new RequestError("Invalid token");
        }

        const isUserAdmin = payload.role === "ADMIN";
        if (!isUserAdmin) {
            throw new UnauthorizedError("You must be an admin to do this");
        }

        const isDataAvailable = await this.showDatabase.verifyDate(startsAt);

        if (!isDataAvailable) {
            throw new ConflictError("We already have a show on this date");
        }

        const starts_at = new Date(startsAt);

        const id = this.idGenerator.generate();
        const show = new Show(
            id,
            band,
            starts_at
        )

        await this.showDatabase.createShow(show);

        const response = {
            message: "Show created successfully",
            show
        }

        return response;
    }

    getShows = async (input: IGetShowsInputDTO) => {
        const token = input.token;
        const search = input.search || "";
        const order = input.order || "ASC";
        const sort = input.sort || "starts_at";
        const limit = Number(input.limit) || 10;
        const page = Number(input.page) || 1;
        const offset = (page - 1) * limit;

        if (!token) {
            throw new RequestError("Missing token");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new RequestError("Invalid token");
        }

        const getShowsInputDB: IGetShowsDBDTO = {
            search,
            order,
            sort,
            limit,
            offset
        }

        const showsDB = await this.showDatabase.getShows(getShowsInputDB);
        const shows = showsDB.map(show => {
            return {
                id: show.id,
                band: show.band,
                startsAt: show.starts_at,
                tickets: show.tickets
            }
        })

        const response = {
            shows
        }

        return response;
    }

    buyTicket = async (input: IBuyTicketInputDTO) => {
        const { token, showId } = input;

        if (!token) {
            throw new RequestError("Missing token");
        }

        if (!showId) {
            throw new RequestError("Missing showId");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new RequestError("Invalid token");
        }

        const show = await this.showDatabase.getShowById(showId);

        if (!show) {
            throw new NotFoundError("Show not found");
        }

        const isAlreadyBought = await this.showDatabase.verifyTicket(payload.id, showId);

        if (isAlreadyBought) {
            throw new ConflictError("You already bought a ticket for this show. Only one ticket per show is allowed");
        }

        const isSoldOut = await this.showDatabase.verifySoldOut(showId);

        if (isSoldOut) {
            throw new ConflictError("Show already sold out");
        }

        const purchaseId = this.idGenerator.generate();
        const purchase = {
            purchase_id: purchaseId,
            user_id: payload.id,
            show_id: showId
        };

        await this.showDatabase.buyTicket(purchase);

        const response = {
            message: "Ticket bought successfully",
        }

        return response;


    }

    cancelTicket = async (input: IBuyTicketInputDTO) => {
        const { token, showId } = input;

        if (!token) {
            throw new RequestError("Missing token");
        }

        if (!showId) {
            throw new RequestError("Missing showId");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new RequestError("Invalid token");
        }
        
        const show = await this.showDatabase.getShowById(showId);

        if (!show) {
            throw new NotFoundError("Show not found");
        }
        
        const isAlreadyBought = await this.showDatabase.verifyTicket(payload.id, showId);
        
        if (!isAlreadyBought) {
            throw new ConflictError("You haven't bought a ticket for this show");
        }
        const isUserAdmin = payload.role === "ADMIN";
        const isUserOwner = payload.id === isAlreadyBought.user_id;

        if (!isUserAdmin && !isUserOwner) {
            throw new UnauthorizedError("You must be an admin to do this");
        }
        
        const cancelTicket: ICancelTicketDBDTO = {
            user_id: payload.id,
            show_id: showId
        }

        await this.showDatabase.cancelTicket(cancelTicket);

        const response = {
            message: "Ticket cancelled successfully",
        }

        return response;

    }

}

