import { React, useRef } from "react";
import Home from "./Components/Home/Home";
import Motivation from "./Components/Motivation/Motivation";
import Testimonials from "./Components/Testimonials/Testimonials";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Services from "./Components/Services/Services";
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Components/Dashboard/Dashboard";
import Userpage from "./Components/Userpage/Userpage";
import DailyActivities from "./Components/DailyActivities/DailyActivities";
import WorkoutOverview from "./Components/WorkoutOverview/WorkoutOverview";
import ManageWorkout from "./Components/ManageWorkout/ManageWorkout";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Notifications from "./Components/Notifications/Notifications";

function App() {
  return (
    <Notifications>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/" exact component={Motivation} />
        <Route path="/" exact component={Services} />
        <Route path="/" exact component={Testimonials} />
        <Route path="/" exact component={Footer} />
        <Switch>
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/userpage" component={Userpage} exact />
          <PrivateRoute
            path="/dailyactivities"
            exact
            component={DailyActivities}
          />
          <PrivateRoute
            path="/workoutoverview"
            exact
            component={WorkoutOverview}
          />
          <PrivateRoute path="/manageWorkout" exact component={ManageWorkout} />
        </Switch>
      </BrowserRouter>
    </Notifications>
  );
}

export default App;
