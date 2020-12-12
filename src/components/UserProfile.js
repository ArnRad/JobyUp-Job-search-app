import React from 'react'
import "../styles/UserProfile.scss";
import { Link } from "react-router-dom";

const UserProfile = ({ handleLogout, userid }) => {

    return (
        <div className="user-profile">
            <Link to="/"><button onClick={handleLogout}>Logout</button></Link>
            <h2>{userid}</h2>
        </div>
    )
}

export default UserProfile
