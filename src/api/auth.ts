// import { NextApiRequest, NextApiResponse } from "next";
// import admin from "../../firebase/firebaseAdmin"; // Ensure this is correct
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("Auth API hit");

//   if (req.method !== "POST") {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   const { token, name, phone, image } = req.body;
//   console.log("Received Token:", token);

//   if (!token) {
//     return res.status(400).json({ error: "Token is required" });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const { uid, email } = decodedToken;

//     console.log("Decoded Token:", { uid, email });

//     let user = await prisma.user.findUnique({
//       where: { id: uid },
//     });

//     if (!user) {
//       console.log("User not found, creating new user...");

//       user = await prisma.user.create({
//         data: {
//           id: uid,
//           email: email ?? "unknown@example.com", // ✅ Fix for TypeScript
//           name: name ?? null, // ✅ Fix
//           phone: phone ?? null, // ✅ Fix
//           image: image ?? null, // ✅ Fix
//         },
//       });

//       console.log("User created:", user);
//     } else {
//       console.log("User already exists:", user);
//     }

//     res.status(200).json({ user });
//   } catch (error) {
//     console.error("Auth error:", error);
//     res.status(401).json({ error: "Unauthorized" });
//   }
// }
