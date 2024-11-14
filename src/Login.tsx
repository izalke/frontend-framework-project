import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importuj useNavigate
import { signIn, signOutUser } from "./routes/firebase"; // Importuj funkcje
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null); // Stan użytkownika
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Monitorowanie stanu użytkownika
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("logged in!");
        console.log(`Użytkownik: ${currentUser.email}`);
        setUser(currentUser);
      } else {
        console.log("No user");
        setUser(null);
      }
    });

    return () => unsubscribe(); // Czyszczenie subskrypcji przy odmontowywaniu komponentu
  }, [auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/"); // Przekierowanie po zalogowaniu
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      console.log("Wylogowano");
      navigate("/"); // Opcjonalnie: Przekierowanie na stronę główną po wylogowaniu
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  return (
    <div>
      {!user ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Hasło:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Zaloguj się</button>
        </form>
      ) : (
        <div>
          <p>Witaj, {user.email}</p> {/* Wyświetlanie e-maila użytkownika */}
          <button onClick={handleLogout}>Wyloguj się</button> {/* Przycisk wylogowania */}
        </div>
      )}
    </div>
  );
};

export default Login;
