import Home from "./Components/Home";
import Motivation from "./Components/Motivation";
import Testimonials from "./Components/Testimonials";
import { Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Home />
      <Motivation />
      <Testimonials />
    </div>
  );
}

export default App;
