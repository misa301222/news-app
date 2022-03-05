import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let categories = await prisma.forumCategory.findMany();
        res.json(categories);
    }

}

export default handler;