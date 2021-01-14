import Home from "./Components/Home"
import Motivation from "./Components/Motivation"
import Testimonials from "./Components/Testimonials"
import { BrowserRouter, Link, Switch, Route } from "react-router-dom"
import "./App.css"
import Services from "./Components/Services"
import Footer from "./Components/Footer"
import Dashboard from "./Components/Dashboard"
import Userpage from "./Components/Userpage"
import DailyActivities from "./Components/DailyActivities"
import WorkoutOverview from "./Components/WorkoutOverview"
import ManageWorkout from "./Components/ManageWorkout"
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/" exact component={Motivation} />
      <Route path="/" exact component={Services} />
      <Route path="/" exact component={Testimonials} />
      <Route path="/" exact component={Footer} />
      <Switch>
        {/* <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/userpage" exact component={Userpage} /> 
        <Route path="/dailyactivities" exact component={DailyActivities} />
        <Route path="/workoutoverview" exact component={WorkoutOverview} />
        <Route path="/manageWorkout" exact component={ManageWorkout} />*/}
        
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
  )
}

export default App
