import React, {useState, useEffect} from 'react'
import fire from "../firebase"
import "../../styles/UserProfile.scss";
import { Link } from "react-router-dom";
import imgPlaceholder from "../../assets/image_placeholder.png";
import Button from '@material-ui/core/Button';

const UserProfile = ({ handleLogout, userid }) => {
    const [userData, setData] = useState([]);

    useEffect(() => {
        fire.firestore().collection("users")
        .where("userd_id", "==", userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setData(doc.data()); console.log();});
          });
    }, []);

    return (
        <div>
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
                            <Link to="/"><Button onClick={handleLogout} variant="contained" size="small" color="primary">Logout</Button></Link>
                            <Button variant="contained" size="small" color="primary">Edit</Button>
                        </div>
                    </div>
                    <div className="user_info_row2">
                        <span>BIO</span>
                        <span className="user_bio">{userData.bio}</span>
                    </div>
                </div>
            </div>
            <div className="adds-section">
                <div className="job-section search">
                    <h1 className="job-section-header">Looking for job</h1>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                </div>
                <div className="job-section offer">
                    <h1 className="job-section-header">Offer a job</h1>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                </div>
            </div> 
        </div>
        
    )
}

export default UserProfile
