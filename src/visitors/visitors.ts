import express, { Router, Request, Response } from "express";
import { getAllVisitors, addVisitor } from "./visitor.service";

const visitorRouter: Router = express.Router();

visitorRouter.get("/", async (req: Request, res: Response) => {
  const visitors = await getAllVisitors();
  res.status(201).json(visitors);
});

visitorRouter.post("/post", async (req: Request, res: Response) => {
  const visitor = await addVisitor(req.body);
  res.status(201).json(visitor);
});

export default visitorRouter;
