import { Router } from "express";
import { ShowController } from "../controller/ShowController";

export const showRouter = Router();
export const showController = new ShowController();

showRouter.post("/", showController.createShow);
showRouter.get("/", showController.getShows);