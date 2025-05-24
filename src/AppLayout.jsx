import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

function AppLayout() {
  return (
    <>
      <AuthProvider>
        {/* App Layout như header/navbar nếu có */}
        <Outlet /> {/* Render nội dung theo route con */}
      </AuthProvider>
    </>
  );
}

export default AppLayout;
