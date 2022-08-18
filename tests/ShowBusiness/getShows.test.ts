import { ShowBusiness } from '../../src/business/ShowBusiness';
import { ShowDatabaseMock } from '../mocks/ShowDatabaseMock';
import { AuthenticatorMock } from '../mocks/services/AuthenticatorMock';
import { IdGeneratorMock } from '../mocks/services/IdGeneratorMock';
import { IGetShowsInputDTO } from '../../src/models/Show';
import { BaseError } from '../../src/errors/BaseError';


describe("ShowBusiness test", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new AuthenticatorMock(),
        new IdGeneratorMock()
    );

    test("Succeded get shows", async () => {
        const input: IGetShowsInputDTO = {
            token: "token-lau",
            search: "",
            order: "ASC",
            sort: "starts_at",
            limit: "10",
            page: "1"
        }

        const response = await showBusiness.getShows(input);

        expect(response.shows.length).toEqual(2);
        expect(response.shows[0].band).toEqual("blink-182");
    })

    test("Failed get shows - invalid token", async () => {
        expect.assertions(2);
        try {
            const input: IGetShowsInputDTO = {
                token: "invalid-token",
                search: "",
                order: "ASC",
                sort: "starts_at",
                limit: "10",
                page: "1"
            }

            await showBusiness.getShows(input);
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Invalid token");
                expect(error.statusCode).toEqual(400);
            }
        }
    })
})