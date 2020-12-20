import React, {useState, useEffect} from 'react'
import "../styles/Chats.scss";
import fire from "../components/firebase"
import Chat from "../components/Chat";

function Chats(userid) {

    const [chatData, setChatData] = useState([]);

    useEffect(() => {
        fire.firestore().collection("messages")
        .where("user.userID", "==", userid.userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setChatData(oldArray => [...oldArray, doc.data()])});
          });
    }, []);

    
    useEffect(() => {
        fire.firestore().collection("messages")
        .where("jobUser.jobUserID", "==", userid.userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setChatData(oldArray => [...oldArray, doc.data()])});
          });
    }, []);

    const setName = (chat) => {
        if(chat.user.userID == userid.userid)
        {
            return chat.jobUser.jobUserName;
        }
        if(chat.jobUser.jobUserID == userid.userid)
        {
            return chat.user.userName;
        }

    };

    const setMessage = (chat) => {
        if(chat.messages === undefined || chat.messages.length == 0)
        {
            return '';
        } else {
            return chat.messages[chat.messages.length - 1];
        }

    };

    const setProfilePic = (chat) => {
        if(chat.user.userID == userid.userid)
        {
            return chat.jobUser.jobUserProfilePic
        }
        if(chat.jobUser.jobUserID == userid.userid)
        {
            return chat.user.userProfilePic
        }
    };

    console.log(chatData)

    return (
        <div className="chats">
        {chatData.map((chat, index) => (
            <Chat key={index}
                name={setName(chat)}
                message={setMessage(chat)}
                // timestamp="40 seconds ago"
                profilePic={setProfilePic(chat)}
            />
        ))}
        </div>
    )
}

export default Chats
