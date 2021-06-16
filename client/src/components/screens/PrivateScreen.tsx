import { useState, useEffect } from "react";
import axios from "axios";
import { History } from "history";

import "./PrivateScreen.scss";

type Props = {
  history: History;
};

const PrivateScreen = ({ history }: Props) => {
  const [error, setError] = useState<string | Error>("");
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/");
    }

    const fecthPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/protected",
          config
        );
        setResponse(data.data);
      } catch (err) {
        localStorage.removeItem("authToken");
        setError("You are not authorized, please login");
      }
    };

    fecthPrivateData();
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    history.push("/");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div className="private-screen">
      <div className="private-screen__message">{response}</div>
      <button onClick={handleLogout} className="btn btn--primary">
        Logout
      </button>
    </div>
  );
};

export default PrivateScreen;
