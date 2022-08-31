import React from 'react'
import Home from './components/pages/Home/Home'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Login from "./components/pages/Login/Login"
import Signup from './components/pages/Signup/Signup'
import ResultPage from './components/pages/Dashboard/ResultPage'
import FavouritePage from './components/pages/FavouritePage/FavouritePage'
import AuthState from "./context/auth/AuthState"


const App = () => {
  return (

  <BrowserRouter>
  <AuthState>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/resultPage" exact component={ResultPage}/>
      <Route path="/favourites" exact component={FavouritePage}/>
    </Switch>
    </AuthState>
  </BrowserRouter>
 
  )
}

export default App