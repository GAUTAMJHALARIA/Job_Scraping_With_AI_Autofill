import { useAuth } from "../context/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    keywords: "",
    location: "",
    remote: "",
    job_type: "", // Fixed Typo: Changed from job_typee to job_type
    seniority_: "",
    time_posted: 7,
  });

  // Fetch jobs based on user input
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/jobs/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters), // Optimized: Directly sending filters as request body
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change and update state dynamically
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="job-list-container">
      {/* Profile Icon (Top Right) */}
      <FaUserCircle className="profile-icon" onClick={() => navigate(`/UserProfile/${authUser.id}`)} />

      {/* Logout Button (Bottom Middle) */}
      <button className="logout-button" onClick={() => { logout(); navigate("/"); }}>Logout</button>

      {/* Search Bar */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          name="keywords" 
          placeholder="Job Title / Keywords" 
          value={filters.keywords} // Fixed: Ensures input reflects state
          onChange={handleFilterChange} 
        />
        <input 
          type="text" 
          className="search-input" 
          name="location" 
          placeholder="City / State / Zip Code" 
          value={filters.location} // Fixed: Ensures input reflects state
          onChange={handleFilterChange} 
        />
        <button className="search-button" onClick={fetchJobs}>Search</button>
      </div>

      {/* Dropdown Filters */}
      <div className="filter-container">
        <select className="filter-dropdown" name="remote" value={filters.remote} onChange={handleFilterChange}>
          <option value="">Remote</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-Site</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <select className="filter-dropdown" name="job_type" value={filters.job_type} onChange={handleFilterChange}>
          {/* Fixed: Changed name from jobType to job_type for consistency */}
          <option value="">Job Type</option>
          <option value="fulltime">Full-Time</option>
          <option value="parttime">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>

        <input
          className="filter-dropdown"
          type="number"
          name="time_posted"
          value={filters.time_posted}
          onChange={handleFilterChange}
          placeholder="Time Posted (hrs)"
          min="0"
        />

        <select className="filter-dropdown" name="experience_level" value={filters.experience_level} onChange={handleFilterChange}>
          <option value="">Internship Level</option>
          <option value="entry_level">Entry Level</option>
          <option value="associate">Associate</option>
          <option value="Mid-senior_level">Mid-Senior level</option>
          <option value="director">Director</option>
          <option value="executive">Executive</option>
        </select>
      </div>

      {/* Animated Title */}
      <h1 className="animated-title">
        <span className="animated-word">Find</span>
        <span className="animated-word">Your</span>
        <span className="animated-word">Dream</span>
        <span className="animated-word">Job</span>
      </h1>

      {/* Job Listings */}
      <h2 className="job-list-title">Job Listings</h2>            
      <div className="job-list-content">
        {loading ? (
          <p>Loading...</p>
        ) : jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div key={index} className="job-item">
              <h2>{job.title}</h2>
              <p><strong>Experience:</strong> {job.experience_level || "Not specified"}</p>
              <p><strong>Location:</strong> {job.location || "Not specified"}</p>
              <p><strong>Job Type:</strong> {job.job_type || "Not specified"}</p>
              <p><strong>Posted:</strong> {job.time_posted || "Not specified"} days ago</p>
              <p><strong>Remote:</strong> {job.remote ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
