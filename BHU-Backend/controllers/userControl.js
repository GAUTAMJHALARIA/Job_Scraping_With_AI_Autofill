import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/userModels.js";
import { generateToken } from "../utils/jwt.js";
dotenv.config({ path: "./config/.env" });
import cloudinary from "../config/cloudinary.js";

// ✅ SIGNUP FUNCTION
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT & set cookie
        generateToken(res, newUser);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email, Password: newUser.password },
            
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ✅ LOGIN FUNCTION
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare passwords using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "somthin ois wrong...." });
        }

        // Generate JWT & set cookie
        generateToken(res, user);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: req.cookies.token,
            user: { id: user._id, name: user.name, email: user.email, Password: user.password }

        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// logout function
export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};


// ✅ GET ALL USERS FUNCTION by id
export const getUsers = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from URL params
        const user = await User.findById(userId) 
        res.status(200).json({
            success: true,
            user,
            message: "User fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
       

// ✅ UPDATE USER PROFILE FUNCTION
export const updateProfile = async (req, res) => {
    try {
        const {
            name, email, phoneNumber, linkedIn, github, college,
            skills, workExperience, workingState, preferredJobs 
        } = req.body;

        const userId = req.params.id; // Get user ID from URL params

        // Check if user exists
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Upload new profile photo if provided
        let profilePhotoUrl = user.profilePhoto;
        if (req.files && req.files.profilePhoto) {
            const profilePhoto = req.files.profilePhoto[0]; // Get uploaded file
            const uploadedProfile = await cloudinary.uploader.upload(profilePhoto.path, { folder: "user_profiles" });
            profilePhotoUrl = uploadedProfile.secure_url;
        }

        // Upload new resume if provided
        let resumeUrl = user.resume;
        if (req.files && req.files.resume) {
            const resume = req.files.resume[0]; // Get uploaded file
            const uploadedResume = await cloudinary.uploader.upload(resume.path, {
                folder: "user_resumes",
                resource_type: "auto"
            });
            resumeUrl = uploadedResume.secure_url;
        }

        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.linkedIn = linkedIn || user.linkedIn;
        user.github = github || user.github;
        user.college = college || user.college;
        user.skills = skills || user.skills;
        user.workExperience = workExperience || user.workExperience;
        user.workingState = workingState !== undefined ? workingState : user.workingState;
        user.preferredJobs = preferredJobs || user.preferredJobs;
        user.profilePhoto = profilePhotoUrl;
        user.resume = resumeUrl;

        // Save updated user
        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                linkedIn: user.linkedIn,
                github: user.github,
                college: user.college,
                skills: user.skills,
                workExperience: user.workExperience,
                workingState: user.workingState,
                preferredJobs: user.preferredJobs,
                profilePhoto: user.profilePhoto,
                resume: user.resume
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
