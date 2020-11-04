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
    return (
        <div className="header">
            {backButton ? (
                <IconButton onClick={() => history.replace(backButton)}>
                    <ArrowBackIosIcon fontSize="large" className="header_icon"/>
                </IconButton>
            ): (
                <IconButton>
                    <PersonIcon fontSize="large"/>
                </IconButton>
            )}

            <Link to="/">
                <img src={MainLogo} alt="main"/>
            </Link>
            <Link to="/chat">
                <IconButton>
                    <ChatBubbleOutlineIcon fontSize="large"/>
                </IconButton>
            </Link>
        </div>
    )
}

export default Header
