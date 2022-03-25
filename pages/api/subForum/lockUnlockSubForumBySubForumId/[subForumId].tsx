import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { subForumId } = req.query;

        let subForum = await prisma.subForum.findFirst({
            where: {
                subForumId: Number(subForumId)
            }
        });

        let subForumUpdate = await prisma.subForum.update({
            where: {
                subForumId: Number(subForumId)
            },
            data: {
                isOpen: !subForum?.isOpen
            }
        });

        res.status(201).json(subForumUpdate);
    }
}

export default handler;