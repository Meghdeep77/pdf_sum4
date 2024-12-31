import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Pdf_upload from "./components/Pdf_upload";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Pdf_upload />
    </div>
  );
}

export default App;
