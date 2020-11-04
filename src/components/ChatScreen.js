import React, { useState } from 'react'
import Avatar from "@material-ui/core/Avatar"
import "../styles/ChatScreen.scss"

function ChatScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name: 'Ellen',
            image: 'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png',
            message: 'Whats up'
        },
        {
            name: 'Ellen',
            image: 'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png',
            message: "I'am going home atm"
        },
        {
            message: "Good for you!"
        }
    ]);

    const handleSend = e => {
        e.preventDefault();

        setMessages([...messages, { message: input }]);
        setInput('');
    }

    return (
        <div className="chatScreen">
            <p className="chatScreen-timestamp">YOU MATCHED WITH ELLEN ON 10/08/20</p>
            {messages.map (message => (
                message.name ? (
                    <div className="chatScreen-message">
                        <Avatar
                            className="chatScreen-image"
                            alt={message.name}
                            src={message.image}
                        />
                        <p className="chatScreen-text">{message.message}</p>
                    </div>
                ) : (
                    <div className="chatScreen-message">
                        <p className="chatScreen-textUser">{message.message}</p>
                    </div> 
                )
            ))}

            <form className="chatScreen-input">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="chatScreen-inputField"
                    placeholder="Type a message..." 
                    type="text"
                />
                <button onClick={handleSend} type="submit" className="chatScreen-inputButton">SEND</button>
            </form>
    
        </div>
    )
}
export default ChatScreen
