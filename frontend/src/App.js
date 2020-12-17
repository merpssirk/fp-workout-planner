import Home from "./Components/Home";
import Motivation from "./Components/Motivation";
import Testimonials from "./Components/Testimonials";
import { Router } from "react-router-dom";
import "./App.css";
import Services from "./Components/Services";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
    <div>
      <Home />
      <Motivation />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
