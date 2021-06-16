import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { History } from "history";

import "./LoginScreen.scss";

type Props = {
  history: History;
};

const LoginScreen = ({ history }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | Error>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      if (localStorage.getItem("authToken")) {
        history.push("/private");
      }
    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form className="login-screen__form" onSubmit={handleLogin}>
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="login-screen__form__group">
          <label>Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-screen__form__group">
          <label>Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--primary">
          Login
        </button>
        <span className="login-screen__route">
          Do not have an account? <Link to="/register">Register</Link>
        </span>
        <span className="login-screen__route">
          <Link to="/forgotpass">Forgot Password?</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
