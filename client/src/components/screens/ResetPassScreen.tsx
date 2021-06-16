import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { History } from "history";

type Props = {
  history: History;
};

type Params = {
  resetToken: string;
};

const ResetPassScreen = ({ history }: Props) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | Error>("");

  const { resetToken } = useParams<Params>();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/auth/resetpass/${resetToken}`,
        { password },
        config
      );

      setResponse(data.data);
    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="reset-screen">
      <form className="reset-screen__form" onSubmit={handleResetPassword}>
        <h3 className="reset-screen_title">Reset Password</h3>
        {error && <span className="error__message">{error}</span>}
        {response && (
          <span className="reset-screen__subtitle">
            {response}
            <Link to="/">Login</Link>
          </span>
        )}
        <div className="reset-screen__form__group">
          <label>New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter the new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="reset-screen__form__group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Confirm the new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn--primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassScreen;
