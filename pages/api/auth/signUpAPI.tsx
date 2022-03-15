import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { fullName, email, password } = req.body;

        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }

        const checkExisting = await prisma.users.findFirst({
            where: {
                email: email
            },
        });

        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' });
            return;
        }

        const status = await prisma.users.create({
            data: {
                fullName: fullName,
                email: email,
                password: await hash(password, 12),
                role: 1
            }
        });

        if (status) {
            let userProfile = await prisma.userProfile.create({
                data: {
                    email: email,
                    profileImageURL: '',
                    coverImageURL: '',
                    aboutMe: '',
                    privateProfile: true,
                    totalPosts: 0,
                    totalMessages: 0
                }
            });

            res.status(201).json({ message: 'User created', ...status, ...userProfile });
        }

        res.status(500).json({ message: 'Something went wrong!' });
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;