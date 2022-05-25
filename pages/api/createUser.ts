import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    const data = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: data.username,
        },
    });
    if (user) {
        res.json({ success: false, message: "Username is taken" });
    }
    try {
        await prisma.user.create({
            data,
        });
        res.status(200).json({ success: true, message: "Successfully created user" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error occured while adding new user" });
    }
};
