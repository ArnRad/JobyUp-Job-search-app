import React, { useState, useEffect } from 'react';
import WorkCard from "react-tinder-card";
import fire from "./firebase";
import "../styles/WorkCards.scss";
import Modal from 'react-modal';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const WorkCards = ({userData}) => {

    const [jobSearch, setJobSearch] = useState([]);
    const [employeeSearch, setEmployeeSearch] = useState([]);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const [openFullAd, setOpenFullAd] = useState(false);
    const [adUserID, setAdUserID] = useState('');
    const [adID, setAdID] = useState('');
    const [user, setUser] = useState('');
    const [ad, setAd] = useState('');

    const [dislikes, setDislikes] = useState([]);
    const [likes, setLikes] = useState([]);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        const unsubscribe = fire.firestore().collection('jobSearch').onSnapshot(snapshot => (
            setJobSearch(snapshot.docs.map(doc => doc.data()))
        ))
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        const unsubscribe = fire.firestore().collection('employeeSearch').onSnapshot(snapshot => (
            setEmployeeSearch(snapshot.docs.map(doc => doc.data()))
        ))
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
    if(userData.likes){
    setLikes(userData.likes);
    }
    if(userData.dislikes){
    setDislikes(userData.dislikes);
    }
    });

    const handleFullAddOpen = (adID, userID) => {
        setOpenFullAd(true);
        setAdUserID(userID)
        setAdID(adID)

        
            fire.firestore().collection("users")
            .where("user_id", "==", userID)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {setUser(doc.data());});
            });

            fire.firestore().collection("jobSearch")
            .where("ad_id", "==", adID)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {setAd(doc.data());});
            });
    }

    const swiped = (direction,adID) => {
        if(direction === "left")
        {
        setLiked(false);
        setDisliked(true);
        let placeholder = dislikes;
        placeholder.push(adID);
        setDislikes(placeholder);
        fire.firestore().collection('users')
                          .doc(userData.user_id)
                          .update({
                              dislikes: dislikes
                          })
                          .catch((error) => {
                            alert(error.message)
                          })
        } else if (direction === "right"){
        setLiked(true);
        setDisliked(false);
        let placeholder = likes;
        placeholder.push(adID);
        setLikes(placeholder);
        fire.firestore().collection('users')
                          .doc(userData.user_id)
                          .update({
                              likes: likes
                          })
                          .catch((error) => {
                            alert(error.message)
                          })
        }
        setTimeout(function() {
            setLiked(false);
            setDisliked(false); 
        }, 1000);
    }
    const emptyHandle = () => {
        setEmpty(true);
        console.log(empty);
    }
    return (
        <div>
            <div className="workCard-container">
                {jobSearch.map(job => (!likes.includes(job.ad_id) && !dislikes.includes(job.ad_id)) ?
                    <WorkCard
                    className="swipe"
                    onSwipe={(dir) => swiped(dir, job.ad_id)}
                    key={job.ad_id}
                    preventSwipe={["up", "down"]}
                    >
                        <div
                        style={{ backgroundImage: `url(${job.img})`}}
                        className="card" onDoubleClick={() => handleFullAddOpen(job.ad_id, job.user_id)}>
                            <div className="card-info">
                                <div className="card-info-title">
                                    <span className="name">{job.user_name}</span>
                                    <span className="location">{job.location}</span>
                                </div>
                                <div className="card-info-text">{job.title}</div>
                            </div>
                        </div>
                    </WorkCard>
                :null)}
                {liked ? (
                    <img className="action_sign" src={require('../assets/tick.svg')}></img>
                ) : (
                    null
                )}
                {disliked ? (
                    <img className="action_sign" src={require('../assets/cross.svg')}></img>
                ) : (
                    null
                )}
            </div>

            <Modal ariaHideApp={false} isOpen={openFullAd} onRequestClose={()=>{setOpenFullAd(false)}}>
                <HighlightOffIcon className="close_button" onClick={()=>{setOpenFullAd(false)}}></HighlightOffIcon>
                <h2>Hello full Ad</h2>
                <div className="ad-container">
                        <div className="ad">
                            <div className="ad-header">Biography</div>
                            <div className="ad-info-field">
                                <div className="ad-info-title">{user.bio}</div>
                            </div>
                            <img className="ad-user-logo" src={`${user.img}`}></img>
                            <div className="ad-header">About me</div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Name</div>
                                <div className="ad-info-value">{user.name}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Surname</div>
                                <div className="ad-info-value">{user.surname}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Gender</div>
                                <div className="ad-info-value">{user.gender}</div>
                            </div>
                            <div className="ad-header">Contacts</div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Email</div>
                                <div className="ad-info-value">{user.email}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Mobile Phone</div>
                                <div className="ad-info-value">{user.mobile}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Location</div>
                                <div className="ad-info-value">{user.location}</div>
                            </div>
                        </div>
                        <div className="ad">
                            <div className="ad-header">Information about my job</div>
                            <div className="ad-info-field">
                                <div className="ad-info-title">{ad.title}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Job Field</div>
                                <div className="ad-info-value">{ad.job_field}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Location</div>
                                <div className="ad-info-value">{ad.location}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Education</div>
                                <div className="ad-info-value">{ad.education}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Languages</div>
                                <div className="ad-info-value">{ad.languages}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Hobbies</div>
                                <div className="ad-info-value">{ad.hobbies}</div>
                            </div>
                            <div className="ad-info-field-big">
                                <div className="ad-info-name">Skills</div>
                                <div className="ad-info-value">{ad.skills}</div>
                            </div>
                            <div className="ad-info-field-big">
                                <div className="ad-info-name">Experience</div>
                                <div className="ad-info-value">{ad.experience}</div>
                            </div>
                            <img className="ad-logo" src={`${ad.img}`}></img>
                        </div>
                        {/* <Button type="submit" variant="contained" color="primary">Submit</Button> */}
                </div>
            </Modal>
        </div>
    )
}

export default WorkCards
