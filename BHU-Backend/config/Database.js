import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:"./config/.env"});

const connectdb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }catch(err){
        console.log("error inc onnection to the database",err);
    }
}
export default connectdb;