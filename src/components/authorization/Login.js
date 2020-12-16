import React from 'react';
import MainLogo from "../../assets/main_logo.png";
import "../../styles/Login.scss";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const Login = (props) => {

  const {email, setEmail, password, setPassword, handleLogin, handleSignUp, hasAccount, setHasAccount, emailError, passwordError} = props;

  return(
    <section className="login">
      <div className="login-container">
        <div className="login-logo">
              <img src={MainLogo} alt="main"/>
            </div>
        <div className="login-form-container">
          <div className="login-form">
            {/* <label className="input-label">Email</label>
            <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/> */}
            <TextField id="standard-basic" type="email" label="Email" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/>
            <p className="error-message">{emailError}</p>

            {/* <label className="input-label">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/> */}
            <TextField id="standard-basic" label="Password" type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
            <p className="error-message">{passwordError}</p>
          </div>
        </div>
        <div className="button-container">
          {hasAccount ? (
            <>
              <div className="button">
                <Button onClick={handleLogin} variant="contained" color="primary">Log In</Button>
              </div>
              <p className="login-p">Don't have an account ? <span className="login-span" onClick={() => setHasAccount(!hasAccount)}> Sign up</span> </p>
            </>
          ) : (
            <>
              <div className="button">
                <Button onClick={handleSignUp} variant="contained" color="primary">Sign up</Button>
              </div>
              <p className="login-p">Have an account? <span className="login-span" onClick={() => setHasAccount(!hasAccount)}>Log in</span></p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Login;