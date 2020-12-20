import React, { useState, useEffect } from 'react'
import fire from '../components/firebase'
import Avatar from "@material-ui/core/Avatar"
import "../styles/ChatScreen.scss"

function ChatScreen({userid}) {

    const urlParams = new URLSearchParams(window.location.search);
    const chatID = urlParams.get('chatID');

    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fire.firestore().collection("messages")
        .where('chat_id','==',chatID)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setChat(oldArray => [...oldArray, doc.data()]); setMessages(doc.data().message)});
          });
    }, []);

    const handleSend = e => {
        e.preventDefault();
        let placeholder = messages;
        placeholder.push(userid + ':' + input);
        setMessages(placeholder);
        console.log(messages);
        fire.firestore().collection('messages')
                          .doc(chatID)
                          .update({
                              message: messages
                          })
                          .catch((error) => {
                            alert(error.message)
                          })
        setInput('');
    }

    return (
        <div className="chatScreen">
            <p className="chatScreen-timestamp">YOU MATCHED WITH ELLEN ON 10/08/20</p>
            {chat.map (message => (
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
