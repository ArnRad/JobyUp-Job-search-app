import React from 'react';
import WorkCards from './components/WorkCards';
import './App.scss';
import Header from './components/Header';
import SwipeButtons from './components/SwipeButtons';
import Chats from './components/Chats';
import ChatScreen from './components/ChatScreen';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat/:person">
           <Header backButton="/chat"/>
            <ChatScreen />
          </Route>
          <Route path="/chat">
           <Header backButton="/"/>
            <Chats/>
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
