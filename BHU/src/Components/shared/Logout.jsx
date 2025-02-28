import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      toast.success("Logout successfully");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Error: " + error);
      setTimeout(() => {}, 2000);
    }
  };
  return (
    <div>
      <button
        style={{
          padding: "8px 16px",
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          borderRadius: "4px",
          cursor: "pointer",
          border: "none",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;