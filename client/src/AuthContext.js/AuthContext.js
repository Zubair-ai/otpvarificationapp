import React, { createContext,useState } from "react";

export const AuthenticationUserContext = createContext();

export default function AuthenticationAdminContextProvider({ children }) {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const [UserData, setUserData] = useState({token:""});
 
  return (
    <AuthenticationUserContext.Provider
      value={{
        UserData, setUserData,isAuthenticatedUser,setIsAuthenticatedUser}}
    >
      {children}
    </AuthenticationUserContext.Provider>
  );
}
