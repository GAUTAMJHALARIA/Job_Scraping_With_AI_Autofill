import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" }); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || "asdfghjkl456sdfghjkl1sdfg23dfghj789dfghjk"; // Securely store this

// Generate JWT Token & Set as Cookie
export const generateToken = (res, user) => {
    const token = jwt.sign(
        { id: user._id, email: user.email }, // Payload
        JWT_SECRET,
        { expiresIn: "7d" } // Token expiration
    );

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing it
        secure: true, // Uses HTTPS in production
        sameSite: "None", // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days expiration
    });

    return token;
};
