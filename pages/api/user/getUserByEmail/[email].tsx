import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // const session = await getSession({ req });

        // if (!session) {
        //     return res.status(400).json({ msg: "Invalid Authentication!" })
        // }

        const { email }: any = req.query;

        let user = await prisma.users.findFirst({
            where: {
                email: email
            },
            select: {
                email: true,
                fullName: true,
                role: true,
                userId: true,                
            }
        });

        res.status(201).json(user);
    }
}

export default handler;