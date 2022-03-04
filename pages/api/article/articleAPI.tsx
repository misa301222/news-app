import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { email }: any = session.user;
        let articles = await prisma.article.findMany({
            where: {
                createdBy: email
            },
        });

        res.status(201).json(articles);
    }

    if (req.method === 'POST') {
        const { header, subHeader, mainImage, paragraph, articleImage, email, datePublished } = req.body;
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let article = await prisma.article.create({
            data: {
                articleHeader: header,
                articleSubHeader: subHeader,
                articleMainImageURL: mainImage,
                articleParagraph: paragraph,
                articleImageURL: articleImage,
                datePublished: datePublished,
                createdBy: email
            }
        })
        res.status(201).json({ message: 'Article created', ...article });
    }

}

export default handler;