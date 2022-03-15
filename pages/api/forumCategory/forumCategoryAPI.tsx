import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let categories = await prisma.forumCategory.findMany();
        res.json(categories);
    }

    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { forumCategoryName, forumCategoryDescription } = req.body;

        let forumCategory = await prisma.forumCategory.create({
            data: {
                forumCategoryName: forumCategoryName,
                forumCategoryDescription: forumCategoryDescription
            }
        });

        res.status(201).json({ message: 'Created!', ...forumCategory });
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { forumCategoryId, forumCategoryName, forumCategoryDescription } = req.body;

        let forumCategory = await prisma.forumCategory.update({
            where: {
                forumCategoryId: forumCategoryId
            },
            data: {
                forumCategoryName: forumCategoryName,
                forumCategoryDescription: forumCategoryDescription
            }
        });

        res.status(201).json(forumCategory);
    }

}

export default handler;