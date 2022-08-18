import { UserBusiness } from "../../src/business/UserBusiness";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { HashManagerMock } from "../mocks/services/HashManagerMock";
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { ILoginInputDTO } from "../../src/models/User";
import { BaseError } from "../../src/errors/BaseError";

describe("UserBusiness test", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new HashManagerMock(),
        new AuthenticatorMock(),
        new IdGeneratorMock()
    );

    test("succeded login", async () => {
        const input: ILoginInputDTO = {
            email: "lau@gmail.com",
            password: "selfmade"
        }

        const response = await userBusiness.login(input);

        expect(response.message).toEqual("User logged in successfully");
        expect(response.token).toEqual("token-lau")
    })

    test("failed login - invalid password", async () => {
        expect.assertions(2);

        try {
            const input: ILoginInputDTO = {
                email: "lau@gmail.com",
                password: "wrongpassword"
            }

            await userBusiness.login(input);
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Invalid password");
                expect(error.statusCode).toEqual(400);
            }
        }
    })

    test("failed login - user not found", async () => {
        expect.assertions(2);

        try {
            const input: ILoginInputDTO = {
                email: "emailfake@gmail.com",
                password: "selfmade"
            }

            await userBusiness.login(input);
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("User not found");
                expect(error.statusCode).toEqual(404);
            }
        }

    })


})