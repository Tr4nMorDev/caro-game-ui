import { useState } from "react";
import "./App.css";
import BackgroundFirst from "./components/BackgroundFirst";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BackgroundFirst />
    </>
  );
}

export default App;
