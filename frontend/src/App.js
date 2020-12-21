import Home from "./Components/Home";
import Motivation from "./Components/Motivation";
import Testimonials from "./Components/Testimonials";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import "./App.css";
import Services from "./Components/Services";
import Footer from "./Components/Footer";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/" exact component={Motivation} />
        <Route path="/" exact component={Services} />
        <Route path="/" exact component={Testimonials} />
        <Route path="/" exact component={Footer} />
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
