import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { searchUser }: any = req.query;

        let userProfiles = await prisma.userProfile.findMany({
            where: {
                email: {
                    contains: searchUser,
                }
            }
        });

        res.status(201).json(userProfiles);
    }
}

export default handler;