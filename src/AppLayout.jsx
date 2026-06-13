import { Outlet } from "react-router-dom";
// import TrackingPixel from "./components/TrackingPixel";
import { AuthProvider } from "./contexts/AuthContext";

function AppLayout() {
  return (
    <AuthProvider>
      {/* Tracking disabled. Re-enable TrackingPixel here if needed. */}
      {/* <TrackingPixel /> */}
      <Outlet />
    </AuthProvider>
  );
}

export default AppLayout;
