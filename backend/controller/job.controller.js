import Job from "../models/job.model.js";

// for recruiter 
export const createJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !location || !jobType || !position || !salary || !companyId) {
            res.status(400).json({
                success: false,
                message: "Fill all the fields."
            });
        }

        if(!experienceLevel) experienceLevel=0;

        const job = await Job.create({  
            title,
            description,
            requirements: requirements.split(","),
            location,
            salary: Number(salary),
            jobType,
            position,
            experienceLevel,
            company: companyId,
            createdBy: userId,
        });

        res.status(200).json({
            success: true,
            job,
            message: "New job created successfully."
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

// for student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req?.query?.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }

        const jobs = await Job.find(query).populate('company').sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Post your first job.",
            });
        }

        res.status(200).json({
            jobs, success: true
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate({
                path: 'applications',
                populate: {
                    path: 'applicant',
                    select: '_id'
                }
            })
            .populate({
                path: 'company',
                select: 'name'
            });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found.",
            });
        }

        res.status(200).json({
            job, success: true,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

// recruiter's created all jobs
export const allCreatedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const jobs = await Job.find({ createdBy: userId })
            .populate({
                path: 'company',
                select: 'name'
            })
            .sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Create/Post your first Job.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Your all posted jobs till now.",
            jobs,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}