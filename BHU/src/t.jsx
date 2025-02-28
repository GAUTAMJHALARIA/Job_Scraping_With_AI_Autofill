import { useState } from "react";
import PropTypes from 'prop-types';

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
    localStorage.setItem('user', email);
    console.log("User saved to storage");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>Don&apos;t have an account? <span onClick={onSwitch}>Sign Up</span></p>
    </div>
  );
};
Login.propTypes = {
  onSwitch: PropTypes.func.isRequired,
};

export default Login;