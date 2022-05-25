import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    const data = req.body;
    try {
        await prisma.deck.create({
            data: {
                title: data.title,
                description: data.description,
                cards: data.cards,
                creator: {
                    connect: {
                        username: data.creatorName,
                    },
                },
            },
        });
        res.status(200).json({ success: true, message: "Successfully created deck" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error occured while adding new deck" });
    }
};
