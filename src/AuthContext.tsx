import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, getCurrentUser, signOutUser, db, ref, get } from "../src/api/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  role: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
     

       
        const roleSnapshot = await get(ref(db, `users/${user.uid}/role`));
        const userRole = roleSnapshot.exists() ? roleSnapshot.val() : "user";
        setRole(userRole);

       
      } else {
        setUser(null);
        setRole(null);
      
      }
    });

    return () => unsubscribe(); 
  }, []);

  const logout = async () => {
    await signOutUser();
    setUser(null);
    setRole(null);
    
  };

  return (
    <AuthContext.Provider value={{ user, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
