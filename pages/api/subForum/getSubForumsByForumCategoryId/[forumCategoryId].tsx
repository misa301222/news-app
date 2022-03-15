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

        let subForums = await prisma.subForum.findMany({
            where: {
                forumCategoryId: Number(forumCategoryId)
            },
            orderBy: {
                dateCreated: 'desc'
            }
        });

        res.status(201).json(subForums);
    }

    if (req.method === 'DELETE') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { forumCategoryId }: any = req.query;

        let subForums = await prisma.subForum.deleteMany({
            where: {
                forumCategoryId: Number(forumCategoryId)
            }
        });

        res.status(201).json({ message: 'Deleted!!', ...subForums });
    }
}

export default handler;