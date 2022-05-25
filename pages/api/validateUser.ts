import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');

export default async (req, res) => {
    const data = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: data.username,
            },
        });
        if (!user) {
            res.json({ success: false, message: 'Username does not exist' })
        }
        bcrypt.compare(data.password, user.password, (err, isMatch) => {
            if (err) {
                res.json({ success: false, message: 'Error occured while logging in' })
            }
            if (isMatch) {
                res.status(200).json({ success: true, message: 'Logged in' });
            } else {
                res.json({ success: false, message: 'Incorrect password' })
            }
        });
    } catch (err) {
        console.log(err);
        res.json({ err: "Error occured while logging in" });
    }
};
