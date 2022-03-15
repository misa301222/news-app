import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { forumCategoryName }: any = req.query;

        let forumCategory = await prisma.forumCategory.findFirst({
            where: {
                forumCategoryName: {
                    equals: forumCategoryName,
                    mode: 'insensitive'
                }
            }
        });

        res.status(201).json(forumCategory);
    }    
}

export default handler;