import { useState } from "react";
import "./App.css";
import BackgroundFirst from "./components/BackgroundFirst";
import StarsCanvas from "./components/StarBackground";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BackgroundFirst />
      <StarsCanvas />
    </>
  );
}

export default App;
