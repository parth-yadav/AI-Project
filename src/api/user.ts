// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } else if (req.method === "POST") {
//     const { email, name } = req.body;
//     const user = await prisma.user.create({ data: { email, name } });
//     res.json(user);
//   }
// }
