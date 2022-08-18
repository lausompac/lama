import { ShowBusiness } from "../../src/business/ShowBusiness";
import { BaseError } from "../../src/errors/BaseError";
import { IBuyTicketInputDTO, IShowInputDTO } from "../../src/models/Show";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock";

describe("ShowBusiness test", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new AuthenticatorMock()
    )

    test("succeded buy ticket", async () => {
        const input: IBuyTicketInputDTO = {
            token: "token-mock",
            showId: "201",
        }

        const response = await showBusiness.buyTicket(input);

        expect(response.message).toEqual("Ticket bought successfully")
    })

    test("failed buy ticket - invalid token", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "invalid-token",
                showId: "202",
            }

            await showBusiness.buyTicket(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Invalid token")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("failed buy ticket - invalid data", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "token-lau",
                showId: "",
            }

            await showBusiness.buyTicket(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Missing showId")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("failed buy ticket - show not found", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "token-lau",
                showId: "203",
            }

            await showBusiness.buyTicket(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Show not found")
                expect(error.statusCode).toEqual(404)
            }
        }
    })

    test("failed buy ticket - show already sold out", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "token-lau",
                showId: "202",
            }

            await showBusiness.buyTicket(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Show already sold out")
                expect(error.statusCode).toEqual(409)
            }
        }
    })
})