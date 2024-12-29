import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import { SigninContainer, FormInput, ErrorMessage } from "./signinElements";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Przekierowanie po zalogowaniu
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <SigninContainer>
      <h1>Sign In</h1>
      <form onSubmit={handleSignin}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FormInput>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormInput>

        <FormInput>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormInput>

        <button type="submit">Log In</button>
      </form>
    </SigninContainer>
  );
};

export default SignIn;
