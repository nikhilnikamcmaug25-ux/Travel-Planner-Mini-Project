import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token missing" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], "SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
