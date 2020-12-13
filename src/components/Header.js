import React from 'react'
import "../styles/Header.scss";
import MainLogo from "../assets/main_logo.png";
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useHistory } from "react-router-dom";

function Header({ backButton }) {
    const history = useHistory();

    const path = window.location.href.split('/')[3]
    return (
        <div className="header">
            {backButton ? (
                <IconButton onClick={() => history.replace(backButton)}>
                    <ArrowBackIosIcon fontSize="large" className="header_icon"/>
                </IconButton>
            ): (
                path == "profile" ? (
                    <Link to="/profile">
                        <IconButton className="profile-icon active">
                            <PersonIcon fontSize="large"/>
                        </IconButton>
                    </Link>
                ) : (
                    <Link to="/profile">
                        <IconButton className="profile-icon">
                            <PersonIcon fontSize="large"/>
                        </IconButton>
                    </Link>
                )
            )}

            <Link to="/">
                <img src={MainLogo} alt="main"/>
            </Link>
            {path == "chat" ? (
                    <Link to="/chat">
                        <IconButton className="chat-icon active">
                            <ChatBubbleOutlineIcon fontSize="large"/>
                        </IconButton>
                    </Link>
                ) : (
                    <Link to="/chat">
                        <IconButton className="chat-icon">
                            <ChatBubbleOutlineIcon fontSize="large"/>
                        </IconButton>
                    </Link>
            )}
        </div>
    )
}

export default Header
