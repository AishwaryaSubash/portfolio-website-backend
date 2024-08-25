import express, { Router, Request, Response } from "express";
import { getAllVisitors, addVisitor } from "./visitor.service";

const visitorRouter: Router = express.Router();

visitorRouter.get("/", async (req: Request, res: Response) => {
  const response = await getAllVisitors();
  if (response.fetched) {
    res
      .status(200)
      .json({ visitors: response.visitors, count: response.count });
  } else {
    res
      .status(500)
      .json({ error: "Failed to fetch visitors", details: response.error });
  }
});

visitorRouter.post("/post", async (req: Request, res: Response) => {
  const response = await addVisitor(req.body);
  if (response.added) {
    res.status(201).json(response.visitor);
  } else {
    res
      .status(500)
      .json({ error: "Failed to add visitor", details: response.error });
  }
});

export default visitorRouter;
