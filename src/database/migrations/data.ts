import { IShowDB, ITicketDB } from "../../models/Show"
import { IUserDB, USER_ROLES } from "../../models/User"

export const users: IUserDB[] = [
    {
        id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
        name: "Lau",
        email: "lau@gmail.com",
        password: "$2a$12$sXDASTjOnod8rIa5iP1ld.Q8s9ZXR8oDAvlmZr.i7Dz7thWGRRfqy",
        role: USER_ROLES.ADMIN
    }
]

export const shows: IShowDB[] = [
    {
        id: "201",
        band: "blink-182",
        starts_at: new Date("2022/12/05")
    }
]

export const tickets: ITicketDB[] = [
    {
        id: "301",
        show_id: "201",
        user_id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b"
    }
]



