import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { subForumId } = req.query;

        let subForum = await prisma.subForum.findUnique({
            where: {
                subForumId: Number(subForumId)
            }
        });

        res.status(201).json(subForum);
    }
}

export default handler;