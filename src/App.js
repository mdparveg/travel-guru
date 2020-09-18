import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Component/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import Login from './Component/Login/Login';
import Place from './Component/Place/Place';
import Notfound from './Component/NotFound/Notfound';
import PlaceDetails from './Component/PlaceDetails/PlaceDetails';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';


  export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]} >
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path='/home'>
          <Home></Home>
        </Route>
        <Route exact path='/'>
          <Home></Home>
        </Route>
        <Route path='/place/:id'>
          <Place></Place>
        </Route>
        <PrivateRoute path='/hotel/:id'>
          <PlaceDetails></PlaceDetails>
        </PrivateRoute>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='*'>
        <Notfound></Notfound>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
