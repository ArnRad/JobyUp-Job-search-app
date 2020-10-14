import React from 'react';
import WorkCards from './components/WorkCards';
import './App.scss';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/chat">
            <h1>I'am chat page</h1>
          </Route>
          <Route path="/">
            <WorkCards />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
