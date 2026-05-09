import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [dialCode, setDialCode] = useState("91");
  const [company,  setCompany]  = useState("");
  const [spot,     setSpot]     = useState(null);

  return (
    <AppContext.Provider value={{ name, setName, email, setEmail, phone, setPhone, dialCode, setDialCode, company, setCompany, spot, setSpot }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
