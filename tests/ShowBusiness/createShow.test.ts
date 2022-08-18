import { ShowBusiness } from "../../src/business/ShowBusiness";
import { BaseError } from "../../src/errors/BaseError";
import { IShowInputDTO } from "../../src/models/Show";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { HashManagerMock } from "../mocks/services/HashManagerMock";
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("ShowBusiness test", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("succeded create show", async () => {
        const input: IShowInputDTO = {
            token: "token-lau",
            band: "Rihanna",
            startsAt: new Date("2022-12-06")
        }

        const response = await showBusiness.createShow(input);

        expect(response.message).toEqual("Show created successfully")
        expect(response.show.getBand()).toEqual("Rihanna")
    })

    test("failed create show - invalid token", async () => {
        expect.assertions(2)
        try {
            const input: IShowInputDTO = {
                token: "invalid-token",
                band: "Rihanna",
                startsAt: new Date("2022-12-06")
            }

            await showBusiness.createShow(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Invalid token")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("failed create show - invalid data", async () => {
        expect.assertions(2)
        try {
            const input: IShowInputDTO = {
                token: "token-lau",
                band: "",
                startsAt: new Date("2022-12-06")
            }

            await showBusiness.createShow(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Missing data")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("failed create show - invalid date", async () => {
        expect.assertions(2)
        try {
            const input: IShowInputDTO = {
                token: "token-lau",
                band: "Rihanna",
                startsAt: new Date("2022-12-01")
            }

            await showBusiness.createShow(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Invalid date")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("failed create show - show already exists", async () => {
        expect.assertions(2)
        try {
            const input: IShowInputDTO = {
                token: "token-lau",
                band: "Rihanna",
                startsAt: new Date("2022-12-05")
            }

            await showBusiness.createShow(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("We already have a show on this date")
                expect(error.statusCode).toEqual(409)
            }
        }
    })

    test("failed create show - unauthorized", async () => {
        expect.assertions(2)
        try {
            const input: IShowInputDTO = {
                token: "token-mock",
                band: "Rihanna",
                startsAt: new Date("2022-12-06")
            }

            await showBusiness.createShow(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("You must be an admin to do this")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    
})