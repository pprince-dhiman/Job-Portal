import express from "express"
import { allCreatedJobs, createJob, getAllJobs, getJobById } from "../controller/job.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const jobRouter = express.Router();

jobRouter.post('/create', isAuthenticated, createJob);
jobRouter.get('/get', getAllJobs);
jobRouter.get('/get/:id', isAuthenticated, getJobById);
jobRouter.get('/admin/get', isAuthenticated, allCreatedJobs);

export default jobRouter;