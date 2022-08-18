import { Request, Response } from "express";
import { TestBusiness } from "../business/TestBusiness";

export class TestController {
    public test = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const testBusiness = new TestBusiness()
            const result = await testBusiness.test()
            res.status(200).send(result)
        } catch (error) {
            res.status(errorCode).send({ message: error.message });
        }
    }
}