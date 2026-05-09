import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { injectGlobalStyles } from "./utils/globalStyles";

import Splash  from "./pages/Splash";
import Why     from "./pages/Why";
import How     from "./pages/How";
import Ready   from "./pages/Ready";
import Signup  from "./pages/Signup";
import Phone   from "./pages/Phone";
import Company from "./pages/Company";
import Done    from "./pages/Done";

injectGlobalStyles();

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/"        element={<Splash />} />
            <Route path="/why"     element={<Why />} />
            <Route path="/how"     element={<How />} />
            <Route path="/ready"   element={<Ready />} />
            <Route path="/signup"  element={<Signup />} />
            <Route path="/phone"   element={<Phone />} />
            <Route path="/company" element={<Company />} />
            <Route path="/done"    element={<Done />} />
            <Route path="*"        element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
