import React from 'react'
import "../styles/Header.scss";
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

function Header() {
    return (
        <div className="background">
            <PersonIcon />
            <h1> Logo </h1>
            <ChatBubbleOutlineIcon />
        </div>
    )
}

export default Header
