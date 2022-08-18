import { ShowBusiness } from "../business/ShowBusiness";
import { Request, Response } from "express";
import { IBuyTicketInputDTO, IGetShowsInputDTO, IShowInputDTO } from "../models/Show";
import { BaseError } from "../errors/BaseError";

export class ShowController {
    constructor(
        private showBusiness = new ShowBusiness()
    ) { }

    createShow = async (req: Request, res: Response) => {
        try {
            const input: IShowInputDTO = {
                token: req.headers.authorization,
                band: req.body.band,
                startsAt: new Date(req.body.startsAt)
            }

            const response = await this.showBusiness.createShow(input);

            res.status(200).send(response);
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred during create show" });
        }
    }

    getShows = async (req: Request, res: Response) => {
        try {
            const input: IGetShowsInputDTO = {
                token: req.headers.authorization,
                search: req.body.search as string,
                order: req.body.order as string,
                sort: req.body.sort as string,
                limit: req.body.limit as string,
                page: req.body.page as string
            }

            const response = await this.showBusiness.getShows(input);

            res.status(200).send(response);
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred during get shows" });
        }
    }

    buyTicket = async (req: Request, res: Response) => {
        try {
            const input: IBuyTicketInputDTO = {
                token: req.headers.authorization,
                showId: req.params.id as string
            }

            const response = await this.showBusiness.buyTicket(input);

            res.status(200).send(response);
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred during buy ticket" });
        }
    }

    cancelTicket = async (req: Request, res: Response) => {
        try {
            const input: IBuyTicketInputDTO = {
                token: req.headers.authorization,
                showId: req.params.id as string
            }

            const response = await this.showBusiness.cancelTicket(input);

            res.status(200).send(response);            
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred during cancel ticket" });
        }
    }
}