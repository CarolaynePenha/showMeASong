import { prisma } from "../src/database.js";
import getRoutersTests from "./getRouters.tests.js";
import postRoutersTestes from "./postRouters.tests.js";

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM recommendations`;
});

getRoutersTests();
postRoutersTestes();

afterAll(async () => {
  await prisma.$disconnect();
});
