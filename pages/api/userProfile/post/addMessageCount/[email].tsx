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

        const messages = await prisma.userProfile.findFirst({
            where: {
                email: email
            },
            select: {
                totalMessages: true
            }
        });

        const { totalMessages }: any = messages;

        const userProfile = await prisma.userProfile.update({
            where: {
                email: email
            },
            data: {
                totalMessages: (totalMessages + 1)
            }
        });

        res.status(201).json({ message: 'Updated!', ...userProfile });
    }
}

export default handler;