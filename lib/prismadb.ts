import { PrismaClient } from "@prisma/client";

// Declare DB as a Global
declare global {
    var prisma: PrismaClient | undefined 
};

const prismadb = globalThis.prisma || new PrismaClient();

// For Next HotRealoading to Prevent Bunch of New Prismases
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
