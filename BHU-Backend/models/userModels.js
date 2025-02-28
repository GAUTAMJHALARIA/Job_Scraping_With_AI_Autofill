import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"]
    },
    phoneNumber: {
        type: String,
        match: [/^\d{10}$/, "Phone number must be 10 digits"]
    },
    linkedIn: {
        type: String,
        trim: true,
        default: ""
    },
    github: {
        type: String,
        trim: true,
        default: ""
    },
    college: {
        type: String,
        trim: true,
        default: ""
    },
    skills: {
        type: [String]
    },
    workExperience: {
        type: String,
        trim: true,
        default: ""
    },
    workingState: {
        type: Boolean,
        default: false
    },
    preferredJobs: {
        type: String,
        trim: true,
        default: ""
    },
    profilePhoto:{
        type:String,
        default:""
    },
    resume: {
        type: String, // Cloudinary URL
        default: ""
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
