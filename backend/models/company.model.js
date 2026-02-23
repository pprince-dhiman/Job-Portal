import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: { type: String},
    website: { type: String},
    location: { type: String},
    logo: { type: String}, // company logo url
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, // owner of company
}, {timestamps: true});

const Company = mongoose.model('Company', companySchema);

export default Company;