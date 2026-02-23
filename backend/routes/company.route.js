import express from "express";
import { getCompanies, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const companyRouter = express.Router();

companyRouter.post('/register',isAuthenticated, registerCompany);
companyRouter.get('/get',isAuthenticated, getCompanies);
companyRouter.get('/get/:id',isAuthenticated, getCompanyById);
// singleUpload =  Accept one file -> Store it in memory -> Attach it to req.file -> Pass it to next controller.
companyRouter.patch('/update/:id',isAuthenticated, singleUpload, updateCompany);

export default companyRouter;