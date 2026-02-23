import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const apply = async(req, res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                success: false,
                message: "Job id is required.",
            });
        }

        // if user already applied for same job
        const alreadyApplied = await Application.findOne({job: jobId,applicant: userId});
        if(alreadyApplied){
            return res.status(400).json({
                success: false,
                message: "You had already applied.",
            });
        }

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(400).json({
                success: false,
                message: "Job doesn't exists.", 
            });
        }

        const newApplication = await Application.create({ job: jobId, applicant: userId });
        job.applications.push(newApplication._id);
        await job.save();
         
        return res.status(200).json({
            success: true,
            message: "Applied for this job successfully."
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }   
}

// get all jobs where user applied.
export const getUserAppliedJobs = async(req, res) => {
    try{
        const userId = req.id;
        const allApplications = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path:'job',
            options: {sort: {createdAt: -1}},
            populate: {
                path: 'company',
                options: {sort: {createdAt: -1}}
            }
        });

        if(allApplications.length===0){
            return res.status(400).json({
                success: false,
                message: "Apply for job.", 
            });
        }

        res.status(200).json({
            success: true,
            allApplications,
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// recruiter's route.
export const jobApplicants = async(req, res) => {
    try{
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path:'applications',
            options: { sort: {createdAt: -1}},
            populate:{
                path:'applicant',
            }
        });

        if(!job){
            return res.status(404).json({
                success: false,
                message: "Job does not exists.",
            });
        }

        res.status(200).json({
            success: true,
            job,
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const updateStatus = async(req,res) => {
    try{
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status){
            return res.status(404).json({
                success: false,
                message: "Status is required.",
            });
        }

        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }
        console.log("Working");

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        res.status(200).json({
            success: true,
            message: "status updated successfully.",
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}