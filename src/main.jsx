import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout.jsx"; // Tạo mới
import BackgroundFirst from "./components/BackgroundFirst";
import StarsCanvas from "./sub/StarBackground.jsx";
import SignupPage from "./page/SignupPage.jsx";
import SigninPage from "./page/SigninPage.jsx";
import "./App.css";
import GameLayout from "./page/GameLayout.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: (
            <>
              <BackgroundFirst />
              <StarsCanvas />
            </>
          ),
        },
        {
          path: "signup",
          element: <SignupPage />,
        },
        {
          path: "signin",
          element: <SigninPage />,
        },
        {
          path: "gameplay",
          element: <GameLayout />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
