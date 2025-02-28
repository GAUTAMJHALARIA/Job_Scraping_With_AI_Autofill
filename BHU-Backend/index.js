import express from "express";
import connectdb from "./config/Database.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";


// Create express app
const app = express();
app.use(cors({ origin: "http://localhost:5173",
 methods: ["GET", "POST", "PUT", "DELETE"],
 credentials: true
 }));
dotenv.config({ path: "./config/.env" });


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



// Routes
app.use("/api/v1/users", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server connected http://localhost:${port}`);
    connectdb();
})