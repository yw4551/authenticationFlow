import User from "../models/userModels.js";
import {
    getAllUsersService,
    loginService,
    registerService,
} from "../services/authService.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username) {
        return res.status(400).json({
            success: false,
            error: "Username is required",
        });
    }

    if (!email) {
        return res.status(400).json({
            success: false,
            error: "Email is required",
        });
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            error: "Password is required",
        });
    }

    try {
        const userData = await registerService(username, email, password);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                user: userData,
            },
        });
    } catch (err) {
        if (err.message === "email_used") {
            return res.status(409).json({
                success: false,
                error: "This email is registered already",
            });
        }

        res.status(500).json({
            success: false,
            error: "Internal Server",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            error: "Email is required",
        });
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            error: "Password is required",
        });
    }

    try {
        const token = await loginService(email, password);

        res.json({
            success: true,
            message: "User logged in successfully",
            data: {
                token,
            },
        });
    } catch (err) {
        if (err.message === "user_not_found") {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        if (err.message === "invalid_password") {
            return res.status(401).json({
                success: false,
                error: "Invalid password",
            });
        }

        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();

        res.json({
            success: true,
            message: "All users list",
            data: {
                users,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};
