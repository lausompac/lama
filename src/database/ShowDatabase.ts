import { ICancelTicketDBDTO, IGetShowsDBDTO, IPurchaseDBDTO, IShowDB, Show } from "../models/Show"
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

    verifyTicket = async (user_id: string, show_id: string) => {
        const result = await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .select()
            .where({ user_id, show_id })

        return result[0]
    }

    verifySoldOut = async (show_id: string): Promise <boolean | undefined> => {
        const result = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .select("tickets")
            .where({ id: show_id })

        if (result[0].tickets === 0) {
            return true
        }
    }

    getShowById = async (show_id: string): Promise<IShowDB | undefined> => {
        const result = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .select()
            .where({ id: show_id })

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
        const purchaseDB = {
            id: purchase.purchase_id,
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

    cancelTicket = async (purchase: ICancelTicketDBDTO ) => {
        const cancelTicketDB = {
            user_id: purchase.user_id,
            show_id: purchase.show_id,
        }

        await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .where({ user_id: cancelTicketDB.user_id, show_id: cancelTicketDB.show_id })
            .delete()

        await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .where("id", "=", `${purchase.show_id}`)
            .increment("tickets", 1)    
    }

}