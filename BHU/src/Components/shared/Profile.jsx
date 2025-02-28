import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import "./Profile.css";

const ProfileSetup = () => {
  const { userId } = useParams(); // Get user ID from route parameters
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    github: "",
    workExperience: "",
    workingState: false, // Boolean value
    college: "",
    skills: "",
    preferredJobs: "",
    profilePicture: null,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "workingState" ? value === "Yes" : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleNext = () => setPage(2);
  const handleBack = () => setPage(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phone);
    formDataToSend.append("linkedIn", formData.linkedIn);
    formDataToSend.append("github", formData.github);
    formDataToSend.append("workExperience", formData.workExperience);
    formDataToSend.append("workingState", formData.workingState);
    formDataToSend.append("college", formData.college);
    formDataToSend.append("skills", formData.skills);
    formDataToSend.append("preferredJobs", formData.preferredJobs);
    if (formData.profilePicture) {
      formDataToSend.append("profilePhoto", formData.profilePicture);
    }
    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/users/updateProfile/${userId}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Profile updated successfully!");
      setTimeout(() => navigate(`/UserProfile/${authUser.id}`), 2000); // Redirect after 2s
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile!");
    }
  };
  return (
    <div className="profile-container">
      <motion.div
        initial={{ opacity: 0, x: page === 1 ? -100 : 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: page === 1 ? 100 : -100 }}
        transition={{ duration: 0.5 }}
        key={page}
        className="form-section"
      >
        {page === 1 ? (
          <>
            <h2>Basic Details</h2>
            <p>Enter your basic details to create your profile</p>
            <form>
              <div className="file-upload">
                <label>Profile Picture</label>
                <input type="file" name="profilePicture" onChange={handleFileChange} required />
              </div>

              <div className="file-upload">
                <label>Resume Upload</label>
                <input type="file" name="resume" onChange={handleFileChange} required />
              </div>

              <div className="input-group">
                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email ID" onChange={handleChange} required />
              </div>

              <div className="input-group">
                <input type="text" name="phone" placeholder="Phone Number (Optional)" onChange={handleChange} />
                <input type="text" name="linkedIn" placeholder="LinkedIn Profile" onChange={handleChange} />
              </div>

              <div className="input-group">
                <input type="text" name="github" placeholder="GitHub Profile" onChange={handleChange} />
              </div>

              <button type="button" className="next-btn" onClick={handleNext}>
                Next
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Professional Background</h2>
            <p>Enter details about your work experience and skills</p>
            <form onSubmit={handleSubmit}>
              <textarea name="workExperience" placeholder="Work Experience (if any)" onChange={handleChange}></textarea>

              <div className="radio-group">
                <label>Currently Working?</label>
                <input type="radio" name="workingState" value="Yes" onChange={handleChange} /> Yes
                <input type="radio" name="workingState" value="No" onChange={handleChange} /> No
              </div>

              <div className="input-group">
                <input type="text" name="college" placeholder="College / University" onChange={handleChange} />
              </div>

              <input type="text" name="skills" placeholder="Key Skills" onChange={handleChange} />
              <input type="text" name="preferredJobs" placeholder="Preferred Jobs (e.g., Full-time, Freelance)" onChange={handleChange} />

              <div className="button-group">
                <button type="button" className="back-btn" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="submit-btn">
                  Save Profile
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
