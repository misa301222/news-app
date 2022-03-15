import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { subForumIdList } = req.body;

        let subForumReplies = await prisma.subForumReply.deleteMany({
            where: {
                subForumId: {
                    in: Number(subForumIdList)
                }
            }
        });

        res.status(201).json({ message: 'Deleted!', ...subForumReplies });

    }
}

export default handler;