import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout.jsx"; // Tạo mới
import BackgroundFirst from "./components/BackgroundFirst";
import StarsCanvas from "./components/StarBackground";
import SignupPage from "./components/SignupPage";
import SigninPage from "./components/SigninPage.jsx";
import "./App.css";
import Dashboard from "./sub/Dashboard.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

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
          path: "dashboard",
          element: <Dashboard />,
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
