import User from "../models/userModels.js";
import bcrypt from "bcrypt";

export const registerService = async (username, email, password) => {
    const validatedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: validatedEmail });

    if (existingUser) {
        throw new Error("email_used");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        username,
        email: validatedEmail,
        password: hashedPassword,
    });

    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
};
