import Home from "./Components/Home";
import Motivation from "./Components/Motivation";
import Testimonials from "./Components/Testimonials";
import { Router } from "react-router-dom";
import "./App.css";
import Services from "./Components/Services";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <Home />
      <Motivation />
      <Testimonials />
      <Services />
      <Footer /
    </div>
  );
}

export default App;
