import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BackgroundFirst from "./components/BackgroundFirst";
import StarsCanvas from "./components/StarBackground";
import SignupPage from "./components/SignupPage";
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
      </Routes>
    </>
  );
}

export default App;
