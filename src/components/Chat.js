import React from 'react'
import "../styles/Chat.scss";
import Avatar from "@material-ui/core/Avatar"
import { Link } from "react-router-dom";

function Chat({ name, message, profilePic, timestamp }) {
    return (
        <Link to={`/chat/${name}`}>
            <div className="chat">
                <Avatar className="chat-image" src={profilePic} />
                <div className="chat-details">
                    <h2>{name}</h2>
                    <p>{message}</p>
                </div>
                <p className="chat-timestamp">{timestamp}</p>
            </div>
        </Link>
    )
}

export default Chat
