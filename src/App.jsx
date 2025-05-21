import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BackgroundFirst from "./components/BackgroundFirst";
import StarsCanvas from "./components/StarBackground";
import SignupPage from "./components/SignupPage";
import SigninPage from "./components/SigninPage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BackgroundFirst />
              <StarsCanvas />
            </>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </>
  );
}

export default App;
