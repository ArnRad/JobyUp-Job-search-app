import React from 'react'
import "../styles/Chats.scss";
import Chat from "../components/Chat";

function Chats() {
    return (
        <div className="chats">
            <Chat 
                name="Mark"
                message="Yo Whats up!"
                timestamp="40 seconds ago"
                profilePic="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"
            />

            <Chat 
                name="John"
                message="Yes, i will do that!"
                timestamp="55 minutes ago"
                profilePic="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"
            />

            <Chat 
                name="Steve"
                message="Do you have any work to do?"
                timestamp="3 hours ago"
                profilePic="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"
            />

            <Chat 
                name="Leon"
                message="I'am up for work!"
                timestamp="5 hours ago"
                profilePic="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"
            />
        </div>
    )
}

export default Chats
