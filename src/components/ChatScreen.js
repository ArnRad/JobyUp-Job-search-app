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

    const [userData, setData] = useState([]);

    useEffect(() => {
        fire.firestore().collection("messages")
        .where('chat_id','==',chatID)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setChat(oldArray => [...oldArray, doc.data()]); setMessages(doc.data().message)});     
          }); 
    }, [])

    setInterval(function(){ 
        fire.firestore().collection("messages")
        .where('chat_id','==',chatID)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setChat(oldArray => [...oldArray, doc.data()]); setMessages(doc.data().message)});
          }); 
    }, 10000);

    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
              fire.firestore().collection("users")
              .where("user_id", "==", user.uid)
              .get()
              .then(querySnapshot => {
                  querySnapshot.docs.map(doc => {setData(doc.data())});
              });
            }
          });
    }, [])

    const checkAuth = e => {
        let auth = false;
        if(chat[0] && userData)
        {
            if(userData.user_id === chat[0].jobUser.jobUserID || userData.user_id === chat[0].user.userID){
                auth = true;
            }
        }
        return auth;
    }

    const handleSend = e => {
        e.preventDefault();
        let placeholder = messages;
        placeholder.push(userid + ':' + input);
        setMessages(placeholder);
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

    const checkChatOwner = (message) => {
        let msgUserID = message.split(":")[0];
        if(msgUserID === userid)
        {
            return true;
        }
        if(msgUserID === userid)
        {
            return false;
        }
    }

    const checkAvatar = () => {
        if(chat[0].user.userID === userid)
        {
            return chat[0].jobUser.jobUserProfilePic
        }
        if(chat[0].jobUser.jobUserID === userid)
        {
            return chat[0].user.userProfilePic
        }
    }

    return (
        <div className="chatScreen-container">
            {checkAuth() ? (
                <div className="chatScreen">
                {messages.length === 0 ? (
                    <div className="chatScreen-title">Start conversation!</div>
                ): (
                    messages.map ((message, index) => (
                        checkChatOwner(message) ? (
                            <div key={index} className="chatScreen-message">
                                <p className="chatScreen-textUser">{message.split(':')[1]}</p>
                            </div>
                        ) : (
                            <div key={index} className="chatScreen-message">
                                <Avatar
                                    className="chatScreen-image"
                                    src={checkAvatar()}
                                />
                                <p className="chatScreen-text">{message.split(':')[1]}</p>
                            </div>
                        )
                    ))
                )}
                <form className="chatScreen-input" onSubmit={handleSend}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="chatScreen-inputField"
                        placeholder="Type a message..." 
                        type="text"
                        required
                    />
                    <button type="submit" className="chatScreen-inputButton">SEND</button>
                </form>
            </div>
            ):(
                null
            )}
        </div>
    )
}
export default ChatScreen