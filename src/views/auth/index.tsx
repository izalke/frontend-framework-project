import React, { useState } from "react";
import { signIn, registerUser } from "../../api/firebase";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      setError("");
      if (isRegister) {
        await registerUser(email, password);
      } else {
        await signIn(email, password);
      }
      navigate("/"); 
    } catch (err) {
      setError("Login error: " + (err as Error).message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? "Rejestracja" : "Logowanie"}</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        placeholder="Adres e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        {isRegister ? "Zarejestruj" : "Zaloguj"}
      </button>
      <p onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Masz już konto? Zaloguj się" : "Nie masz konta? Zarejestruj się"}
      </p>
    </div>
  );
};

export default Auth;
