import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";

const app = express();
const options = {
    // origin: 'http://localhost:5173',
    origin: true,
    credentials: true,
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors(options));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/job', jobRouter);
app.use('/api/v1/application', applicationRouter);

const PORT=process.env.PORT;

const initConnection = () => {
    connectDB()
    .then(()=> {
        console.log("Connected to DB.");
        app.listen(PORT, ()=>{
            console.log("Listening on ", PORT);
        });
    })
    .catch((err) => console.log(err));
}

initConnection();