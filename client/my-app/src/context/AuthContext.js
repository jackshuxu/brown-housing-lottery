import { useContext, createContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext({
  isSignedIn: false,
  googleSignIn: () => Promise.resolve(),
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const googleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      const userEmail = response.user.email || "";

      // Check if the email ends with the allowed domain
      if (userEmail.endsWith("@brown.edu")) {
        console.log(response.user.uid);
        setIsSignedIn(true);
      } else {
        // User is not allowed, sign them out and show a message
        logOut();
        console.log("User not allowed. Signed out.");
        alert("Access restricted to Brown University members only.");
        setIsSignedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    signOut(auth);
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
