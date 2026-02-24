import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        let { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;

        let cloudResponse;
        if(file){
            const dataUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(dataUri.content, { folder: 'job_portal/user_profile_photo' });
        }
        
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Fill all input fields.",
            });
        }

        password = await bcrypt.hash(password, 10);

        let user = await User.create({
            fullname, 
            email, 
            phoneNumber, 
            password, 
            role,
        });

        if(cloudResponse){
            user.profile.profilePhoto = cloudResponse.secure_url;
            await user.save();
        }
        
        res.status(201).json({
            success: true,
            message: `Account created for ${fullname}.`,
        });
    }
    catch (err) {
        console.log(err);
        if (err.code === 11000) { //error code for duplicate field.
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ success: false, message: "Fill all fields." });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                success: false,
                message: "Account doesn't exist with this Role."
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // for testing in both production and local machine.
        const isProduction = process.env.NODE_ENV === 'production';

        res.status(200).cookie('token', token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
        }).json({
            success: true,
            user,
            message: `Welcome back ${user.fullname}.`
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const file = req.file;
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, { folder: 'job_portal/resume' });
        }

        let skillsArray;

        if (skills) {
            skillsArray = skills.split(","); // getting skills in string.(str -> arr)
        }
        const userId = req.id; // from auth middleware.

        let user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }

        // update data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // resume url comes here in cloudRes.
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // save cloudinary url
            user.profile.resumeOriginalName = file.originalname; //save original file name.
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });

    } catch (err) {;
        res.status(500).json({ success: false, message: err.message });
    }
}

export const logout = (req, res) => {
    try {
        return res.status(200).cookie('token', "", {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        }).json({
            message: "Logged out successfully.",
            success: true,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}