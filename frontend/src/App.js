import Home from "./Components/Home";
import Motivation from "./Components/Motivation";
import { Router } from "react-router-dom";
import "./App.css";
import Services from "./Components/Services";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <Home />
      <Motivation />
      <Services />
      <Footer />
    </div>
  );
}

export default App;
