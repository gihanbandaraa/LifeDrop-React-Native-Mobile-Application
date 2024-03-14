import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth();

export function useAuth() {
  
  const [user, setUser] = React.useState<User>();
  console.log("isnide the auth:",user)
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
   if (user) {
    setUser(user);
  } else {
    setUser(undefined);
  }
}, (error) => {
  console.error("Auth state change error:", error);
});

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}