import { registerService } from "../services/authService.js";

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
            error: err.message,
        });
    }
};
