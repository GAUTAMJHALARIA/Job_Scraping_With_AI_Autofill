import { Link } from "react-router-dom"; // Importing Link for navigation
import { useForm } from "react-hook-form"; // Importing useForm hook for form validation
import axios from "axios"; // Importing axios for making API requests
import toast from "react-hot-toast"; // Importing toast for notifications
import "./Login.css"; // Importing external CSS file for styling

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Using react-hook-form for form handling and validation

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email, // Collecting email from form data
      password: data.password, // Collecting password from form data
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        userInfo
      ); // Sending login request to backend
      if (res.data) {
        toast.success("Logged in Successfully"); // Showing success toast message
        localStorage.setItem("Users", JSON.stringify(res.data.user)); // Storing user data in localStorage
        setTimeout(() => window.location.reload(), 1000); // Reloading the page after 1 second
      }
    } catch (err) {
      toast.error(
        `Error: ${err.response?.data?.message || "Something went wrong"}`
      ); // Showing error toast message
    }
  };

  return (
    <dialog id="login-container"> {/* Modal container for login */}
    <div className="login-modal"> {/* Main modal wrapper */}
      <div className="modal-box"> {/* Box that holds the modal content */}
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}> {/* Login form */}
          <button
            type="button"
            className="close-btn"
            onClick={() =>
              document.getElementById("login-container").close()
            } // Closing the modal when clicked
          >
            ✕ {/* Close button */}
          </button>
          <h3 className="modal-title">Login</h3> {/* Modal title */}

          <div className="form-group"> {/* Grouping email input field */}
            <label>Email</label> {/* Label for email */}
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })} // Registering email input with validation
            />
            {errors.email && (
              <span className="error-text">This field is required</span>
            )} {/* Error message for email field */}
          </div>

          <div className="form-group"> {/* Grouping password input field */}
            <label>Password</label> {/* Label for password */}
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })} // Registering password input with validation
            />
            {errors.password && (
              <span className="error-text">This field is required</span>
            )} {/* Error message for password field */}
          </div>

          <div className="form-footer"> {/* Footer for form actions */}
            <button type="submit" className="login-btn">Login</button> {/* Submit button for login */}
            <p> {/* Text for redirecting to signup */}
              Not registered?{" "}
              <Link to="/signup" className="signup-link"> {/* Link to signup page */}
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </dialog>
  );
}

export default Login; // Exporting Login component
