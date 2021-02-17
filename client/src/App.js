import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { GiSpyglass } from "react-icons/gi";

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './subcomponents/MenuBar';
import Home from './components/Home';
import Coin from './components/Coin'
import Login from './components/Login';
import Register from './components/Register';
import SinglePost from './components/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container> 
          <div className="spycont"><GiSpyglass className="spyglass"/><h1 className="spytext">Spyglass</h1></div>
          <MenuBar className="menu" />
          <Route exact path="/" component={Home} />
          <Route exact path="/coin" component={Coin} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
