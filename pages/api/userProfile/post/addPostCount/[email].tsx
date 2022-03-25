import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { email }: any = req.query;

        let numberPosts = await prisma.userProfile.findFirst({
            where: {
                email: email
            },
            select: {
                totalPosts: true
            }
        });


        const { totalPosts }: any = numberPosts;

        const userProfile = await prisma.userProfile.update({
            where: {
                email: email,
            },
            data: {
                totalPosts: (totalPosts + 1),
            }
        });

        res.status(201).json({ message: 'Updated', ...userProfile });
    }
}

export default handler;