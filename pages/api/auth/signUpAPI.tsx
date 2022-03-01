import { PrismaClient } from "@prisma/client";
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function handler(req: any, res: any) {
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
                privateProfile: false,
                profileImageURL: '',
                coverImageURL: '',
                totalPosts: 0,
                totalMessages: 0,
                role: 1                
            }
        })        
        res.status(201).json({ message: 'User created', ...status });
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;