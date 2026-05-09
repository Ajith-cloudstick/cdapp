import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [dialCode, setDialCode] = useState("91");
  const [company,  setCompany]  = useState("");
  const [spot,     setSpot]     = useState(null);
  
  // Auth state
  const [hasJoined, setHasJoined] = useState(() => {
    return localStorage.getItem("caw_joined") === "true";
  });

  const markAsJoined = (val = true) => {
    setHasJoined(val);
    localStorage.setItem("caw_joined", val ? "true" : "false");
  };

  return (
    <AppContext.Provider value={{ 
      name, setName, 
      email, setEmail, 
      phone, setPhone, 
      dialCode, setDialCode, 
      company, setCompany, 
      spot, setSpot,
      hasJoined, markAsJoined
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
