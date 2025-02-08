import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, registerUser } from "../../api/firebase";
import { AuthContainer, AuthTitle, ErrorMessage, Input, AuthButton, ToggleText } from "./authElements";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
      setError("Błąd logowania: " + (err as Error).message);
    }
  };

  return (
    <AuthContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AuthTitle>{isRegister ? "Rejestracja" : "Logowanie"}</AuthTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="email"
        placeholder="Adres e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <AuthButton whileTap={{ scale: 0.95 }} onClick={handleAuth}>
        {isRegister ? "Zarejestruj" : "Zaloguj"}
      </AuthButton>
      <ToggleText onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Masz już konto? Zaloguj się" : "Nie masz konta? Zarejestruj się"}
      </ToggleText>
    </AuthContainer>
  );
};

export default Auth;
