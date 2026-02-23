import express from "express"
import { apply, getUserAppliedJobs, jobApplicants, updateStatus } from "../controller/application.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const applicationRouter = express.Router();

applicationRouter.post('/apply/:id', isAuthenticated, apply);
applicationRouter.get('/get', isAuthenticated, getUserAppliedJobs);
applicationRouter.get('/:id/applicants', isAuthenticated, jobApplicants);
applicationRouter.patch('/:id/status/update', isAuthenticated, updateStatus);

export default applicationRouter;