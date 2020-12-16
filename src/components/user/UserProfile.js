import React, {useState, useEffect} from 'react'
import fire from "../firebase"
import "../../styles/UserProfile.scss";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const UserProfile = ({ handleLogout, userid }) => {
    const [userData, setData] = useState([]);
    const [userJobSearchData, setUserJobSearchData] = useState([]);
    const [userEmployeeSearchData, setUserEmployeeSearchData] = useState([]);

    useEffect(() => {
        fire.firestore().collection("users")
        .where("user_id", "==", userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setData(doc.data()); console.log();});
          });
    }, []);

    useEffect(() => {
        fire.firestore().collection("jobSearch")
        .where("user_id", "==", userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setUserJobSearchData(oldArray => [...oldArray, doc.data()])});
          });
    }, []);

    useEffect(() => {
        fire.firestore().collection("employeeSearch")
        .where("user_id", "==", userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setUserEmployeeSearchData(oldArray => [...oldArray, doc.data()])});
          });
    }, []);

    return (
        <div>
            <div className="user-profile">
                {/* <h2>{userid}</h2> */}
                <div className="user_info_container">
                    <div className="user_info_row">
                        <img className="img_placeholder" src={userData.img} alt="Logo"/>
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
                    </div>
                    <div className="user_info_row2">
                        <span>BIO</span>
                        <span className="user_bio">{userData.bio}</span>
                    </div>
                    <div className="user_controls">
                            <Link to="/"><Button onClick={handleLogout} variant="contained" className="user_button" size="small" color="primary">Logout</Button></Link>
                            <Button variant="contained" className="user_button" size="small" color="primary">Edit</Button>
                    </div>
                </div>
            </div>
            <div className="adds-section">
                <div className="job-section search">
                    <h1 className="job-section-header">Job Search</h1>
                    {userJobSearchData.length != 0 ? (
                        userJobSearchData.map((job, index) => (
                        <div className="job-card-container">
                            <div key={index} className="job-card">
                                <div className="job-field">
                                    <div className="job-field-description">Job Field</div>
                                    <div className="job-field-value"> {job.job_field}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Experience</div>
                                    <div className="job-field-value"> {job.experience}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Skills</div>
                                    <div className="job-field-value"> {job.skills}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Location</div>
                                    <div className="job-field-value"> {job.location}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">University</div>
                                    <div className="job-field-value"> {job.university}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">School</div>
                                    <div className="job-field-value"> {job.school}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Languages</div>
                                    <div className="job-field-value"> {job.languages}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Hobbies</div>
                                    <div className="job-field-value"> {job.hobbies}</div>
                                </div>
                            </div> 
                            </div>
                        ))             
                    ) : (
                        <div className="no-ad-section">
                            <h3>You have no job ad yet, if you like to add one, press button</h3>
                            <span><Button variant="contained" className="ad-section-button" size="small" color="primary">Add</Button></span>
                        </div>
                    )}
                </div>
                <div className="job-section offer">
                    <h1 className="job-section-header">Employee Search</h1>
                    {userEmployeeSearchData.length != 0 ? (
                        userEmployeeSearchData.map((job, index) => (
                        <div className="job-card-container">
                            <div key={index} className="job-card">
                                <div className="job-field">
                                    <div className="job-field-description">Duties</div>
                                    <div className="job-field-value"> {job.duties}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Experience</div>
                                    <div className="job-field-value"> {job.experience}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Job Field</div>
                                    <div className="job-field-value"> {job.job_field}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Location</div>
                                    <div className="job-field-value"> {job.location}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Position</div>
                                    <div className="job-field-value"> {job.position}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Salary</div>
                                    <div className="job-field-value"> {job.salary}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Skills</div>
                                    <div className="job-field-value"> {job.skills}</div>
                                </div>
                            </div> 
                            </div>
                        ))             
                    ) : (
                        <div className="no-ad-section-container">
                            <div className="no-ad-section">
                                <h3>You have no job ad yet, if you like to add one, press button</h3>
                                <span><Button variant="contained" className="ad-section-button" size="small" color="primary">Add</Button></span>
                            </div>
                        </div>

                    )}
                </div>
            </div> 
        </div>
        
    )
}

export default UserProfile
