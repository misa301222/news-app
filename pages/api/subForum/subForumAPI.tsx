import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { subForumName, subForumDescription, subForumImageURL, dateCreated, createdBy, forumCategoryId } = req.body;

        let subForum = await prisma.subForum.create({
            data: {
                subForumName: subForumName,
                subForumDescription: subForumDescription,
                subForumImageURL: subForumImageURL,
                dateCreated: dateCreated,
                createdBy: createdBy,
                forumCategoryId: forumCategoryId
            }
        });

        res.status(201).json({ message: 'Data Created!', ...subForum })

    }
}

export default handler;