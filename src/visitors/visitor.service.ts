import { Prisma } from "@prisma/client";
import { client } from "../../prisma/prisma";
import { VisitorDto } from "../dto/visitor.dto";

async function getAllVisitors() {
  try {
    const visitors = await client.visitor.findMany();
    return { fetched: true, visitors: visitors, count: visitors.length };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { fetched: false, message: e };
    } else {
      return { fetched: false, message: e };
    }
  }
}

async function addVisitor(visitorData: VisitorDto) {
  try {
    const visitor = await client.visitor.create({
      data: {
        ip: visitorData.ip,
      },
    });
    return { added: true, visitor: visitor };
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { added: false, message: e };
    } else {
      return { added: false, message: e };
    }
  }
}

export { getAllVisitors, addVisitor };
