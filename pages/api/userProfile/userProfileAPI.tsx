import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { email, profileImageURL, coverImageURL, aboutMe, privateProfile }: any = req.body;
        let userProfile = await prisma.userProfile.update({
            where: {
                email: email
            },
            data: {
                profileImageURL: profileImageURL,
                coverImageURL: coverImageURL,
                aboutMe: aboutMe,
                privateProfile: privateProfile
            }
        });

        res.status(201).json({ message: 'Updated!', ...userProfile })
    }
}

export default handler;