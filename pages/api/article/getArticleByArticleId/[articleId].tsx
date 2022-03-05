import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { articleId } = req.query;
        let article = await prisma.article.findUnique({
            where: {
                articleId: Number(articleId)
            }
        });

        res.status(201).json(article);
    }

    if (req.method === 'DELETE') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        console.log(req.query);

        const { articleId } = req.query;
        let article = await prisma.article.delete({
            where: {
                articleId: Number(articleId)
            }
        });

        res.status(201).json(article);
    }
}

export default handler;