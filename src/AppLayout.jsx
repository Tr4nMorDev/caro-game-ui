import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      {/* App Layout như header/navbar nếu có */}
      <Outlet /> {/* Render nội dung theo route con */}
    </>
  );
}

export default AppLayout;
