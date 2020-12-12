import React, {useState} from 'react'
import fire from "./firebase"
import "../styles/UserProfile.scss";
import { Link } from "react-router-dom";
import imgPlaceholder from "../assets/image_placeholder.png";

const UserProfile = ({ handleLogout, userid }) => {
    const [userData, setData] = useState([]);

    fire.firestore().collection("users")
    .doc('hVVJjugztH4f96169Qwk') //ima pagal auto id firestore, o reik pagal user_id
    .get()
    .then(doc => {
        setData(doc.data());
        console.log(userData.name);
    });

    return (
        <div className="user-profile">
            {/* <h2>{userid}</h2> */}
            <div className="user_info_container">
                <div className="user_info_row">
                <img className="img_placeholder" src={imgPlaceholder} alt="Logo"/>
                <div className="user_info_column">
                <span>Name</span>
                <h2>{userData.name}</h2>
                <span>Surname</span>
                <h2>{userData.surname}</h2>
                </div>
                <div className="user_info_column">
                <span>Tel. number</span>
                <h2>{userData.mobile}</h2>
                <span>Email</span>
                <h2>{userData.email}</h2>
                </div>
                <div className="user_info_column">
                <span>Gender</span>
                <h2>{userData.gender}</h2>
                <span>Location</span>
                <h2>{userData.location}</h2>
                </div>
                <div className="user_info_column user_controls">
                <Link to="/"><button className="btn_logout" onClick={handleLogout}>Logout</button></Link>
                <button className="btn_edit" >Edit</button>
                </div>
                </div>
                <div className="user_info_row2">
                <span>BIO</span>
                <span className="user_bio">{userData.bio}</span>
                </div>
            </div>
        </div>      
    )
}

export default UserProfile
