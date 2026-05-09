import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
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

function ReferralCapture() {
  const [params] = useSearchParams();
  useEffect(() => {
    const ref = params.get("ref");
    if (ref) {
      sessionStorage.setItem("caw_referred_by", ref);
      localStorage.setItem("caw_referred_by", ref);
    }
  }, [params]);
  return null;
}

function AppRoutes() {
  const { hasJoined } = useApp();

  return (
    <>
    <ReferralCapture />
    <Routes>
      {/* If already joined, most pages redirect to /done */}
      <Route 
        path="/" 
        element={hasJoined ? <Navigate to="/done" replace /> : <Splash />} 
      />
      <Route 
        path="/signup" 
        element={hasJoined ? <Navigate to="/done" replace /> : <Signup />} 
      />
      <Route 
        path="/phone" 
        element={hasJoined ? <Navigate to="/done" replace /> : <Phone />} 
      />
      <Route 
        path="/company" 
        element={hasJoined ? <Navigate to="/done" replace /> : <Company />} 
      />
      
      {/* Info pages can be viewed regardless, or maybe not? 
          Usually info pages are fine. Let's keep them open. */}
      <Route path="/why"     element={<Why />} />
      <Route path="/how"     element={<How />} />
      <Route path="/ready"   element={<Ready />} />

      {/* Done page: only accessible if joined. 
          If not joined, redirect to home. */}
      <Route 
        path="/done" 
        element={hasJoined ? <Done /> : <Navigate to="/" replace />} 
      />

      <Route path="*" element={<Navigate to={hasJoined ? "/done" : "/"} replace />} />
    </Routes>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
