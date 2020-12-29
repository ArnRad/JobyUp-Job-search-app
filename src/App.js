import React from 'react';
import fire from './components/firebase'
import { useEffect, useState } from 'react';
import WorkCards from './components/WorkCards';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/information/About';
import SwipeButtons from './components/SwipeButtons';
import Chats from './components/Chats';
import ChatScreen from './components/ChatScreen';
import Login from './components/authorization/Login';
import UserProfile from './components/user/UserProfile';
import UserInfo from './components/user/UserInfo';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import TrustAndSafety from './components/information/TrustAndSafety';
import Support from './components/information/Support';
import Privacy from './components/information/PrivacyPolicy';

const App = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [userData, setData] = useState([]);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearUserData = () => {
    setData('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      })
  }
  
  const handleSignUp = () => {
    clearErrors();
    fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    })
  }

  const handleLogout = () => {
    clearUserData();
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        clearInputs();
        setUser(user);

        fire.firestore().collection("users")
        .where("user_id", "==", user.uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setData(doc.data());});
        });

      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, [])

  return (
    <div className="App">
      {user ? (
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path="/chat/:person">
              <Header backButton="/chat"/>
              <ChatScreen userid={userData.user_id} />
            </Route>
            {userData.user_id ? (
              <Route path="/profile">
                <Header />
                <UserProfile handleLogout={handleLogout} userid={user.uid}/>
              </Route>
            ) : (
              <Route path="/profile">
                <Header />
                <UserInfo handleLogout={handleLogout} userid={user.uid} userEmail={user.email}/>
              </Route>
            )}
            <Route path="/chat">
              <Header backButton="/"/>
              <Chats userid={user.uid}/>
            </Route>
            <Route path="/privacypolicy">
              <Header/>
              <Privacy/>
            </Route>
            <Route path="/support">
              <Header/>
              <Support/>
            </Route>
            <Route path="/trustandsafety">
              <Header/>
              <TrustAndSafety/>
            </Route>
            <Route path="/about">
              <Header/>
              <About/>
            </Route>
            <Route path="/">
              <Header />
              <WorkCards userData={userData}/>
              <SwipeButtons />
            </Route>
          </Switch>
          <Footer />
        </Router>
      ) : (
          <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}/>
      )}
    </div>
  );
}

export default App;
