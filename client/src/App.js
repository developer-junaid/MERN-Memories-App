import React from "react";

// React Router
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Material-UI
import { Container } from "@material-ui/core";

// Components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home"
import Auth from './components/Auth/Auth'

export default function App() {
  // Return
  return (
    <BrowserRouter>
      <Container maxwidth="lg">
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
