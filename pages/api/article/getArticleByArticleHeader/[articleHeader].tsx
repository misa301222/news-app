import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // const session = await getSession({ req });

        // if (!session) {
        //     return res.status(400).json({ msg: "Invalid Authentication!" })
        // }

        const { articleHeader }: any = req.query;

        let article = await prisma.article.findMany({
            where: {
                articleHeader: {
                    contains: articleHeader,
                    mode: "insensitive"
                }
            }
        });

        res.status(201).json(article);
    }
}

export default handler;