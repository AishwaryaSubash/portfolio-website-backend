import { Prisma } from "@prisma/client";
import { client } from "../../prisma/prisma";
import { VisitorDto } from "../dto/visitor.dto";

async function getAllVisitors() {
  try {
    const visitors = await client.visitor.findMany();
    return { fetched: true, visitors: visitors, count: visitors.length };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { fetched: false, error: e };
    } else {
      return { fetched: false, error: e };
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
      return { added: false, error: e };
    } else {
      return { added: false, error: e };
    }
  }
}

export { getAllVisitors, addVisitor };
