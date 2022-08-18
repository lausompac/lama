import { BaseDatabase } from "../../src/database/BaseDatabase"
import { ICancelTicketDBDTO, IGetShowsDBDTO, IPurchaseDBDTO, IShowDB, Show } from "../../src/models/Show"


export class ShowDatabaseMock extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    verifyDate = async (starts_at: Date) => {
        switch (starts_at.getDate()) {
            case 5:
                return {
                    id: "201",
                    band: "blink-182",
                    starts_at: new Date("2022-12-05")

                } as IShowDB

            default:
                return null
        }
    }

    verifyTicket = async (user_id: string, show_id: string) => {
        switch (user_id + show_id) {
            case "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b" + "201":
                return {
                    id: "123123",
                    show_id: "201",
                    user_id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b"
                } as ICancelTicketDBDTO

            default:
                return undefined
        }
    }

    verifySoldOut = async (show_id: string) => {
        switch (show_id) {
            case "202":
                return true
            default:
                return false
        }
    }

    getShowById = async (show_id: string) => {
        switch (show_id) {
            case "201":
                return {
                    id: "201",
                    band: "blink-182",
                    starts_at: new Date("2022-12-05")

                } as IShowDB

            case "202":
                return {
                    id: "202",
                    band: "Maria Bethania",
                    starts_at: new Date("2022-12-06")

                } as IShowDB

            default:
                return undefined
        }
    }

    createShow = async (show: Show) => {

    }

    getShows = async (input: IGetShowsDBDTO) => {
        const shows: IShowDB[] = [
            {
                id: "201",
                band: "blink-182",
                starts_at: new Date("2022-12-05")
            },
            {
                id: "202",
                band: "Maria Bethânia",
                starts_at: new Date("2022-12-06")
            }
        ]

        return shows

    }

    buyTicket = async (purchase: IPurchaseDBDTO) => {

    }

    cancelTicket = async (purchase: ICancelTicketDBDTO) => {

    }
}