import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const loginService = async (email, password) => {
    const validatedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: validatedEmail });

    if (!user) {
        throw new Error("user_not_found");
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
        throw new Error("invalid_password");
    }

    const token = jwt.sign(
        {
            userId: user._id.toString(),
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        },
    );

    return token;
};

export const getAllUsersService = async () => {
    return User.find().select("-password");
};
