import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { IBuyTicketInputDTO } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("ShowBusiness test", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new AuthenticatorMock()
    )

    test("succeded cancel ticket", async () => {
        const input: IBuyTicketInputDTO = {
            token: "token-lau",
            showId: "201",
        }

        const response = await showBusiness.cancelTicket(input);

        expect(response.message).toEqual("Ticket cancelled successfully")
    })

    test("failed cancel ticket - invalid token", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "invalid-token",
                showId: "202",
            }

            await showBusiness.cancelTicket(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Invalid token")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("failed cancel ticket - invalid data", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "token-lau",
                showId: "",
            }

            await showBusiness.cancelTicket(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Missing showId")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("failed cancel ticket - show not found", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "token-lau",
                showId: "205",
            }

            await showBusiness.cancelTicket(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Show not found")
                expect(error.statusCode).toEqual(404)
            }
        }
    })
})
