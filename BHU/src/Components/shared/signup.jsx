import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import "./Signup.css"; // import external CSS

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:3000/api/v1/users/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <dialog id="signup-container" className="signup-dialog">
      <div className="signup-popup-container">
        <div className="signup-popup">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button type="button" className="close-btn" onClick={() => document.getElementById("signup-container").close()}>
              ✕
            </button>

            <h3 className="signup-heading">Signup</h3>

            <div className="form-group">
              <label>Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter your fullname"
                {...register("fullname", { required: true })}
                className="form-input"
              />
              {errors.fullname && (
                <span className="error-text">This field is required</span>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="form-input"
              />
              {errors.email && (
                <span className="error-text">This field is required</span>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                className="form-input"
              />
              {errors.password && (
                <span className="error-text">This field is required</span>
              )}
            </div>

            <div className="form-footer">
              <button type="submit" className="signup-btn">
                Signup
              </button>
              <p className="login-text">
                Have an account?
                <button
                  type="button"
                  className="login-link"
                  onClick={() =>
                    document.getElementById("login-container").showModal()
                  }
                >
                  Login
                </button>
                <Login />
              </p>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Signup;


























// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Login from "./Login";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import toast from "react-hot-toast";

// function Signup() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from?.pathname || "/";
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const userInfo = {
//       fullname: data.fullname,
//       email: data.email,
//       password: data.password,
//     };
//     await axios
//       .post("http://localhost:3000/api/v1/users/signup", userInfo)
//       .then((res) => {
//         console.log(res.data);
//         if (res.data) {
//           toast.success("Signup Successfully");
//           navigate(from, { replace: true });
//         }
//         localStorage.setItem("Users", JSON.stringify(res.data.user));
//       })
//       .catch((err) => {
//         if (err.response) {
//           console.log(err);
//           toast.error("Error: " + err.response.data.message);
//         }
//       });
//   };

//   return (
//     <dialog id="signup-containerr" >
//       <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ width: "600px" }}>
//           <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "24px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Link
//                 to="/"
//                 style={{ position: "absolute", top: "8px", right: "8px", background: "transparent", border: "none", cursor: "pointer" }}
//               >
//                 ✕
//               </Link>

//               <h3 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "16px" }}>Signup</h3>
//               <div style={{ marginBottom: "16px" }}>
//                 <label>Name</label>
//                 <br />
//                 <input
//                   type="text"
//                   placeholder="Enter your fullname"
//                   style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", outline: "none" }}
//                   {...register("fullname", { required: true })}
//                 />
//                 {errors.fullname && (
//                   <span style={{ color: "#EF4444", fontSize: "0.875rem" }}>This field is required</span>
//                 )}
//               </div>

//               <div style={{ marginBottom: "16px" }}>
//                 <label>Email</label>
//                 <br />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", outline: "none" }}
//                   {...register("email", { required: true })}
//                 />
//                 {errors.email && (
//                   <span style={{ color: "#EF4444", fontSize: "0.875rem" }}>This field is required</span>
//                 )}
//               </div>

//               <div style={{ marginBottom: "16px" }}>
//                 <label>Password</label>
//                 <br />
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", outline: "none" }}
//                   {...register("password", { required: true })}
//                 />
//                 {errors.password && (
//                   <span style={{ color: "#EF4444", fontSize: "0.875rem" }}>This field is required</span>
//                 )}
//               </div>

//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <button
//                   type="submit"
//                   style={{ padding: "8px 16px", backgroundColor: "#EC4899", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
//                 >
//                   Signup
//                 </button>
//                 <p style={{ fontSize: "1rem" }}>
//                   Have an account?
//                   <button
//                     style={{ background: "none", border: "none", textDecoration: "underline", color: "#3B82F6", cursor: "pointer" }}
//                     onClick={() => document.getElementById("login-container").showModal()}
//                   >
//                     Login
//                   </button>
//                   <Login />
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </dialog>
//   );
// }

// export default Signup;



