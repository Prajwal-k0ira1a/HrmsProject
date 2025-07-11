import express from "express";
import mongoose from "mongoose";
import departmentRoutes from './routes/departmentRoutes.js';
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import routes from "./routes/route.js"
import cookieParser from "cookie-parser";
import Employee from "./models/employee.js";
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

// const seedAdmin=async ()=>{
//     try{
//         const admin =await Employee.findOne({email:"admin@gmail.com"});
//         if(!admin){
//             const hashedPassword=await bcrypt.hash('admin',10);
//             await Employee.create({
//                 "name": "Niraj Acharya",
//                 "email": "niraj.acharya@gmail.com",
//                 "password": hashedPassword,
//                 "role": "admin",
//                 "department": "60d21bb0d240e00f8c5e4e22",
//                 "designation": "Technical Lead",
//                 "salary": 115000,
//                 "profileImage": "https://example.com/images/niraj.jpg",
//                 "phoneNumber": "9809988776",
//                 "address": "Pokhara, Gandaki",
//                 "dateOfJoining": "2020-02-10T00:00:00.000Z",
//                 "isActive": true
//             });
            
            
//         }
//     }catch(error){
//         console.log(error);
//     }
// };
//     seedAdmin();