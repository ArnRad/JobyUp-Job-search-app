import React from 'react'
import "../styles/Header.scss";
import MainLogo from "../assets/main_logo.png";
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import IconButton from "@material-ui/core/IconButton";

function Header() {
    return (
        <div className="header">
            <IconButton>
                <PersonIcon fontSize="large"/>
            </IconButton>

                <img src={MainLogo} alt="main"/>

            <IconButton>
                <ChatBubbleOutlineIcon fontSize="large"/>
            </IconButton>
        </div>
    )
}

export default Header
