import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { subForumReplyId } = req.query;

        let subForumReply = await prisma.subForumReply.delete({
            where: {
                subForumReplyId: Number(subForumReplyId)
            }
        });

        res.status(201).json({ message: 'Deleted!', ...subForumReply })
    }
}

export default handler;