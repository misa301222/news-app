import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { email }: any = req.query;
        let articles = await prisma.article.findMany({
            where: {
                createdBy: email
            }
        });

        res.status(201).json(articles);
    }
}

export default handler;