import { useState } from "react";
import axios from "axios";

const ForgotPassScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | Error>("");

  const HandleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        "http://localhost:8000/api/v1/auth/forgotpass",
        { email },
        config
      );
      setResponse(data.data);
    } catch (err) {
      setError(err.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgot-screen">
      <form onSubmit={HandleForgotPassword} className="forgot-screen__form">
        <h3 className="forgot-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {response && <span className="response-message">{response}</span>}
        <div className="forgot-screen__form__group">
          <p className="forgot-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <label>Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--primary">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassScreen;
