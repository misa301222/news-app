import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let articles = await prisma.article.findMany({
            take: 20,
            orderBy: {
                datePublished: 'desc',
            }
        });

        res.status(201).json(articles)
    }
}

export default handler;