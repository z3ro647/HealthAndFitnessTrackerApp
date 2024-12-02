import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../firebaseConfig"; // Correct import of Firebase config
import { onAuthStateChanged } from "firebase/auth";

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user

  useEffect(() => {
    // Set up the listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state whenever auth state changes
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Provide both user and setUser so they can be used in other components
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
