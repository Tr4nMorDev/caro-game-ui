import { StrictMode, Suspense, lazy, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout.jsx"; // Tạo mới
import "./App.css";
import { AudioProvider } from "./contexts/AudioContext.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const BackgroundFirst = lazy(() => import("./components/BackgroundFirst"));
const StarsCanvas = lazy(() => import("./sub/StarBackground.jsx"));
const SignupPage = lazy(() => import("./page/SignupPage.jsx"));
const SigninPage = lazy(() => import("./page/SigninPage.jsx"));
const GameLayout = lazy(() => import("./page/GameLayout.jsx"));

const RouteFallback = () => <div className="route-fallback" aria-label="Loading" />;

const DeferredStarsCanvas = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const scheduleIdle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 350));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
    const idleId = scheduleIdle(() => setIsReady(true));

    return () => cancelIdle(idleId);
  }, []);

  if (!isReady) return null;

  return <StarsCanvas />;
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<RouteFallback />}>
              <BackgroundFirst />
              <DeferredStarsCanvas />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <SignupPage />
            </Suspense>
          ),
        },
        {
          path: "signin",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <SigninPage />
            </Suspense>
          ),
        },
        {
          path: "gameplay",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <GameLayout />
            </Suspense>
          ),
        },
        {
          path: "playgame",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <GameLayout />
            </Suspense>
          ),
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
      <AudioProvider>
        <RouterProvider router={router} />
      </AudioProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
