import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                error: "Authentication required",
            });
        }

        const token = header.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verifiedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: "Invalid or expired token",
        });
    }
};

export default authMiddleware;
