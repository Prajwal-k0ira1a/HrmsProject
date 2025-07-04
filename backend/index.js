import express from "express";
import mongoose from "mongoose";
import departmentRoutes from './routes/departmentRoutes.js';
import dotenv from "dotenv";
import emp from "./routes/employeeRoutes.js"

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const MongoDb_Url = process.env.MONGODB_URL;
const dbConnection = mongoose.connect(MongoDb_Url);

dbConnection.then(() => {
    console.log("Connected");

}).catch((error) => {
    console.error("Error connecting to server:", error);
    process.exit(1);
})

app.use("/api/employees", emp);
app.use('/api/departments', departmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/performance', performanceRoutes);


app.get("/", (req, res) => {
    res.send("Prajwal God");
})


app.listen(port, () => {
    console.log("Example listening at ",
        `http://localhost:${port}`);
})
