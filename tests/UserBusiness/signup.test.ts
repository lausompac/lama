import { UserBusiness } from "../../src/business/UserBusiness";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { HashManagerMock } from "../mocks/services/HashManagerMock";
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { ISignupInputDTO } from "../../src/models/User";
import { BaseError } from "../../src/errors/BaseError";

describe("UserBusiness test", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new HashManagerMock(),
        new AuthenticatorMock(),
        new IdGeneratorMock()
    );

    test("succeded signup", async () => {
        const input: ISignupInputDTO = {
            name: "Thalita",
            email: "thali@gmail.com",
            password: "123456"
        }

        const response = await userBusiness.signup(input);

        expect(response.message).toEqual("User created successfully");
        expect(response.token).toEqual("token-mock")
    })

    test("failed signup - user already exists", async () => {
        expect.assertions(1);

        try {
            const input: ISignupInputDTO = {
                name: "Lau",
                email: "lau@gmail.com",
                password: "selfmade"
            }  

            await userBusiness.signup(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("User already exists");

            }
        }
    })

    test("failed signup - invalid name", async () => {
        expect.assertions(2);

        try {
            const input: ISignupInputDTO = {
                name: "",
                email: "email@teste.com",
                password: "blablabla"
            }

            await userBusiness.signup(input);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                expect(error.message).toEqual("Invalid name");
                expect(error.statusCode).toEqual(400);
            }
        }
    })
})