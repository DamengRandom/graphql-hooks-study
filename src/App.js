import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

import './App.css';
import { AuthProvider } from "./context/auth";
import Menubar from "./components/MenuBar";
import AuthRoute from "./utils/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Menubar />
          <fRoute exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
