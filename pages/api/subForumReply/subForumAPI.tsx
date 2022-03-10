import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { subForumReplyDescription, createdBy, subForumId }: any = req.body;

        let subForumReply = await prisma.subForumReply.create({
            data: {
                subForumReplyDescription: subForumReplyDescription,
                createdBy: createdBy,
                subForumId: Number(subForumId)
            }
        });

        res.status(201).json({ message: 'Reply Created!', ...subForumReply })
    }
}

export default handler;