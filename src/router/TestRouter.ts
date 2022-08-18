import { Router } from "express";
import { TestController } from "../controller/TestController";

export const testRouter = Router();
export const testController = new TestController();

testRouter.get("/", testController.test);