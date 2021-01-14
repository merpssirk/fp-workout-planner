import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function PrivateRoute(props) {
  const isLoggedIn = JSON.parse(window.localStorage.getItem("loggedIn"))
  return (
    <>
      {isLoggedIn ? <Route {...props} /> : <Redirect to={{ pathname: "/" }} />}
    </>
  )
}
