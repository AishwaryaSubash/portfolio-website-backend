import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

// app.use(async (req: Request, res: Response, next: NextFunction) => {
//   const ip = req.ip || "";

//   try {
//     const existingVisitor = await prisma.visitor.findUnique({
//       where: { ip: ip },
//     });

//     if (!existingVisitor) {
//       await prisma.visitor.create({
//         data: { ip: ip },
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("Error tracking visitor:", error);
//     next(error);
//   }
// });

export const visitorTracker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.headers["x-forwarded-for"] || req.ip || "";
  // const hostname = req.hostname || "";

  try {
    const existingVisitor = await prisma.visitor.findUnique({
      where: { ip: String(ip) },
    });
    if (!existingVisitor) {
      await prisma.visitor.create({
        data: { ip: String(ip) },
      });
    }
    res.status(200).send("Visitor tracked successfully");
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).send("Error tracking visitor");
  }
};
