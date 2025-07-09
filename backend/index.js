import express from "express";
import mongoose from "mongoose";
import departmentRoutes from './routes/departmentRoutes.js';
import dotenv from "dotenv";
// import emp from "./routes/employeeRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import leaveRoutes from"./routes/leaveRoutes.js";
// import payrollRoutes from "./routes/payrollRoutes.js";
// import performanceRoutes from "./routes/performanceRouter.js";
// import authRoutes from"./routes/authRoutes.js"

import routes from "./routes/route.js"
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

const MongoDb_Url = process.env.MONGODB_URL;
const dbConnection = mongoose.connect(MongoDb_Url);

app.use("/api",routes);
dbConnection.then(() => {
    console.log("Connected");

}).catch((error) => {
    console.error("Error connecting to server:", error);
    process.exit(1);
})


app.get("/", (req, res) => {
    res.send("Prajwal God");
})



app.listen(port, () => {
    console.log("Example listening at ",
        `http://localhost:${port}`);
})
