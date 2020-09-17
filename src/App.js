import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Component/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import Login from './Component/Login/Login';
import Place from './Component/Place/Place';
import Notfound from './Component/NotFound/Notfound';
import PlaceDetails from './Component/PlaceDetails/PlaceDetails';

function App() {
  return (
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
        <Route path='/hotel/:id'>
          <PlaceDetails></PlaceDetails>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='*'>
        <Notfound></Notfound>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
