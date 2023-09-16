import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Nav from './components/Nav';

export default function App() {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path="/about">
            {/* <About /> */}
          </Route>
          <Route path="/contact">
            {/* <Contact /> */}
          </Route>
          <Route path="/projects">
            {/* <Projects /> */}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}