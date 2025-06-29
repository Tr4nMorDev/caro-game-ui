import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BackgroundFirst from "./components/BackgroundFirst";
import StarsCanvas from "./components/StarBackground";
import SignupPage from "./components/SignupPage";
import SigninPage from "./components/SigninPage";
import GameLayout from "./components/GameLayout";
function App() {
  // const [count, setCount] = useState(0);

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
        <Route path="/gameplay" element={<GameLayout />} />
      </Routes>
    </>
  );
}

export default App;
