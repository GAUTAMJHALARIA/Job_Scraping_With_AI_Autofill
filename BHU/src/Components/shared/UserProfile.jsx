import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams for dynamic ID

import axios from "axios";
import { toast } from "react-hot-toast";
import "./userProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get user ID from URL params
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/getAllUsers/${userId}`
        );
        setUserData(response.data.user);
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!userData) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <img
          src={userData.profilePhoto || "default-avatar.png"}
          alt="Profile"
          className="profile-picture"
        />
        <h3>{userData.name}</h3>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phoneNumber || "N/A"}</p>
        <p>
          LinkedIn:{" "}
          <a href={userData.linkedIn} target="_blank" rel="noopener noreferrer">
            {userData.linkedIn}
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a href={userData.github} target="_blank" rel="noopener noreferrer">
            {userData.github}
          </a>
        </p>
        <p>College: {userData.college}</p>
        <p>Work Experience: {userData.workExperience || "N/A"}</p>
        <p>Currently Working: {userData.workingState ? "Yes" : "No"}</p>
        <p>Skills: {userData.skills?.join(", ") || "N/A"}</p>
        <p>Preferred Jobs: {userData.preferredJobs || "N/A"}</p>
        {userData.resume && (
          <p>
            Resume:{" "}
            <a href={userData.resume} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </p>
        )}
      </div>
      <button className="edit-btn" onClick={() => navigate(`/profile/${userId}`)}>
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfile;
