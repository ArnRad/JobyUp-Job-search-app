import React from 'react';
import WorkCards from './components/WorkCards';
import './App.scss';
import Header from './components/Header';
import SwipeButtons from './components/SwipeButtons';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat">
           <Header backButton="/"/>
            <h1>I'am chat page</h1>
          </Route>
          <Route path="/">
            <Header />
            <WorkCards />
            <SwipeButtons />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
