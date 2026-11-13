import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const res = await axios.post(
      `${API_URL}/api/login`,
      {
        email,
        password,
      }
    );

    if (res.data.success) {

      localStorage.setItem(
        "userEmail",
        email
      );

      alert("Login Successful");

      navigate("/booking");
    }

  } catch (error) {

    alert("Invalid Credentials");

  }
};
  return (
    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleLogin}
      >

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;