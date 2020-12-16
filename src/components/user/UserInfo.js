import React, {useState, useEffect} from 'react'
import fire from "../firebase"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../../styles/UserInfo.scss";
import { Link } from "react-router-dom";
import imgPlaceholder from "../../assets/image_placeholder.png";

const UserProfile = ({ handleLogout, userid }) => {

    return (
        <div>
            <div className="user-profile">
                <div className="user-info-container">
                    <div className="user-welcome-container">
                        <div className="user-welcome">
                            <h1>Welcome to your profile page</h1>
                            <h2>To start with please fill up information about yourself</h2>
                            <h3>Or you can <Link to="/"><Button onClick={handleLogout} variant="contained" size="small" color="primary">Logout</Button></Link></h3>
                        </div>
                    </div>
                    <div className="user-form-container">
                        <div className="user-form">
                            <TextField id="standard-basic" label="" type="" required/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
