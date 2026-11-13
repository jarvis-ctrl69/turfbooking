import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ADMIN = import.meta.env.VITE_ADMIN;
const PASSWORD = import.meta.env.VITE_PASSWORD;



function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (
      username === ADMIN &&
      password === PASSWORD
    ) {

      localStorage.setItem(
        "admin",
        "true"
      );

      navigate("/admin");

    } else {

      alert("Invalid Admin Login");

    }
  };

  return (
    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleLogin}
      >

        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;