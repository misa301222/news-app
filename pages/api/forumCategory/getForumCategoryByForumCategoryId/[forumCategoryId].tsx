import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { forumCategoryId } = req.query;

        let forumCategory = await prisma.forumCategory.delete({
            where: {
                forumCategoryId: Number(forumCategoryId)
            }
        });

        res.status(201).json({ message: 'Deleted Forum!!!', ...forumCategory })
    }
}

export default handler;