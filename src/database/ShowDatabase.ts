import { IGetShowsDBDTO, IPurchaseDBDTO, IShowDB, Show } from "../models/Show"
import { BaseDatabase } from "./BaseDatabase"


export class ShowDatabase extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    verifyDate = async (starts_at: Date): Promise<IShowDB | null>=> {
        const result = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .select()
            .where({ starts_at })


        return result[0]
    }

    createShow = async (show: Show) => {
        const showDB: IShowDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt(),
        }

        await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .insert(showDB)
    }
    
    getShows = async (input: IGetShowsDBDTO) => {
        const { search, order, sort, limit, offset } = input

        if(search) {
            const showsDB = await BaseDatabase
                .connection(ShowDatabase.TABLE_SHOWS)
                .select("*")
                .where(`band`, "=", `'%${search}%'`)
                .orderBy(sort, order)
                .limit(limit)
                .offset(offset)

            return showsDB
        } else {
            const showsDB: IShowDB[] = await BaseDatabase
                .connection(ShowDatabase.TABLE_SHOWS)
                .select("*")
                .orderBy(sort, order)
                .limit(limit)
                .offset(offset)

            return showsDB
        }
    }

    buyTicket = async (purchase: IPurchaseDBDTO) => {
        const purchaseDB: IPurchaseDBDTO = {
            show_id: purchase.show_id,
            user_id: purchase.user_id
        }

        await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .insert(purchaseDB)

        await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .where("id", "=", `${purchase.show_id}`)
            .decrement("tickets", 1)
    }

}