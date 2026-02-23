import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const registerCompany = async(req, res) => {
    try{
        const {companyName} = req.body;

        if(!companyName){
            return res.status(400).json({
                success: false,
                message: "Fill company name.",
            });
        }

        const company =  await Company.create({ 
            name: companyName,
            userId: req.id,
        });

        res.status(200).json({
            success: true,
            message: `${companyName} registered successfully.`,
            company,
        });
    }
    catch(err){
        // Duplicate entry error.
        if(err.code === 11000){
            return res.status(400).json({
                success: false,
                message: "Try different name, this name already taken.",
            });
        }

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

// showing companies of the loggedIn owner.
export const getCompanies = async(req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId});

        if(!companies){
            return res.status(404).json({
                success: false,
                message: "Resgister your company/Companies not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Your companies.",
            companies,
        });

    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

export const getCompanyById = async(req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if(!company){
            return res.status(404).json({
                success: false,
                message: "Company not found.",
            });
        }

        res.status(200).json({ success: true, company });
    } 
    catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

export const updateCompany = async(req, res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file; 
        
        const updatedData = { name, description, website, location };

        // cloudinary part
        if(file){
            const dataUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(dataUri.content, {folder: 'job_portal/company_logo'});
            updatedData.logo = cloudResponse.secure_url;
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, {new: true, runValidators: true});

        if(!company){
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        return res.status(200).json({
            success: true,
            company,   // return updated document
            message: "Company information updated.",
        });
    } 
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}