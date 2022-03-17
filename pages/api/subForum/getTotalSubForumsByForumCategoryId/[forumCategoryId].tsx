import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { forumCategoryId }: any = req.query;

        let totalSubForums = await prisma.subForum.aggregate({
            where: {
                forumCategoryId: Number(forumCategoryId)
            },
            _count: true
        });

        res.status(201).json(totalSubForums);
    }
}

export default handler;