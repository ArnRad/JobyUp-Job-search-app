import React, { useState, useEffect } from 'react';
import WorkCard from "react-tinder-card";
import fire from "./firebase";
import "../styles/WorkCards.scss";
import "../styles/SwipeButtons.scss";
import Modal from 'react-modal';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import IconButton from "@material-ui/core/IconButton";

const WorkCardsEmployee = ({userData}) => {

    const [employeeSearch, setEmployeeSearch] = useState([]);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const [openFullAd, setOpenFullAd] = useState(false);
    const [user, setUser] = useState('');
    const [ad, setAd] = useState('');

    const [dislikes, setDislikes] = useState([]);
    const [likes, setLikes] = useState([]);
    let noAdsMessage = "There is no new ad's left for you!";

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
        
            fire.firestore().collection("users")
            .where("user_id", "==", userID)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {setUser(doc.data());});
            });

            fire.firestore().collection("employeeSearch")
            .where("ad_id", "==", adID)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {setAd(doc.data());});
            });
    }

    const swiped = (direction,adID, jobUserId, jobUserName, jobUserProfilePic) => {
        if(direction === "left")
        {
        setLiked(false);
        setDisliked(true);
        if(userData.user_id){
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
        }
        } else if (direction === "right"){
        setLiked(true);
        setDisliked(false);
        if(userData.user_id){
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
        const crypto = require("crypto");
        const chat_id = crypto.randomBytes(16).toString("hex");
        fire.firestore().collection('messages')
        .doc(chat_id)
        .set({
                chat_id: chat_id,
                user:
                {
                        userID: userData.user_id,
                        userName: userData.name,
                        userProfilePic: userData.img
                },

                jobUser:
                {
                    jobUserID: jobUserId,
                    jobUserName: jobUserName,
                    jobUserProfilePic: jobUserProfilePic
                },
                message: [ 

                ]
            })
            .then(() => {
            })
            .catch((error) => {
                alert(error.message)
            })
        }
        }
        setTimeout(function() {
            setLiked(false);
            setDisliked(false); 
        }, 1000);
        
    }

    // Button Functionality, disliked, liked and return
    const handleSwipeButtons = (action, adID, jobUserId, jobUserName, jobUserProfilePic) => {
        if(action === "disliked")
        {
            setLiked(false);
            setDisliked(true);
            if(userData.user_id){
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
            }       
        } else if (action === "liked"){
            setLiked(true);
            setDisliked(false);
            if(userData.user_id){
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
            const crypto = require("crypto");
            const chat_id = crypto.randomBytes(16).toString("hex");
            fire.firestore().collection('messages')
            .doc(chat_id)
            .set({
                chat_id: chat_id,
                user:
                {
                    userID: userData.user_id,
                    userName: userData.name,
                    userProfilePic: userData.img
                },

                jobUser:
                {
                    jobUserID: jobUserId,
                    jobUserName: jobUserName,
                    jobUserProfilePic: jobUserProfilePic
                },
                message: [ 

                ]
            })
            .then(() => {
            })
            .catch((error) => {
                alert(error.message)
            })
        }
        } else if (action === "reset") {
            if(dislikes.length !== 0) {
                let placeholder = dislikes;
                placeholder.length = placeholder.length - 1;
                setDislikes(placeholder);
                fire.firestore().collection('users')
                    .doc(userData.user_id)
                    .update({
                        dislikes: dislikes
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            }
        }
            setTimeout(function() {
                setLiked(false);
                setDisliked(false); 
            }, 1000);
    }

    // Get ad info that is on display (latest)
    const getDisplayAdInfo = () => {
        let adInfo = [];
        for(let i = 0; i < employeeSearch.length; i++)
        {
            if(!likes.includes(employeeSearch[i].ad_id) && !dislikes.includes(employeeSearch[i].ad_id) && employeeSearch[i].user_id !== userData.user_id){
                adInfo.adId = employeeSearch[i].ad_id;
                adInfo.adUserId = employeeSearch[i].user_id;
                adInfo.adUserName = employeeSearch[i].user_name;
                adInfo.adUserImg = employeeSearch[i].img;
            }
        }
        return adInfo;
    }

    // Methods that react to button click and call other methods
    const handleOnDislikeClick = () => {
        let adInfo = getDisplayAdInfo();
        handleSwipeButtons("disliked", adInfo.adId, adInfo.adUserId, adInfo.adUserName, adInfo.adUserImg);
    }
    
    const handleOnLikeClick = () => {
        let adInfo = getDisplayAdInfo();
        handleSwipeButtons("liked", adInfo.adId, adInfo.adUserId, adInfo.adUserName, adInfo.adUserImg);
    }

    const handleOnSkipClick = () => {
        handleSwipeButtons("reset")
    }

    return (
        <div>
            <div className="workCard-container">
                <div className="noAds-message">{noAdsMessage}</div>
                {employeeSearch.map(employee => (!likes.includes(employee.ad_id) && !dislikes.includes(employee.ad_id) && employee.user_id !== userData.user_id) ?
                    <WorkCard
                    className="swipe"
                    onSwipe={(dir) => swiped(dir, employee.ad_id, employee.user_id, employee.user_name, employee.img)}
                    key={employee.ad_id}
                    preventSwipe={["up", "down"]}
                    >
                        <div
                        style={{ backgroundImage: `url(${employee.img})`}}
                        className="card" onDoubleClick={() => handleFullAddOpen(employee.ad_id, employee.user_id)}>
                            <div className="card-info">
                                <div className="card-info-title">
                                    <span className="name">{employee.user_name}</span>
                                    <span className="location">{employee.location}</span>
                                </div>
                                <div className="card-info-text">{employee.title}</div>
                            </div>
                        </div>
                    </WorkCard>
                : null ) }
                {liked ? (
                    <img alt="action_sign" className="action_sign" src={require('../assets/tick.svg')}></img>
                ) : (
                    null
                )}
                {disliked ? (
                    <img alt="action_sign" className="action_sign" src={require('../assets/cross.svg')}></img>
                ) : (
                    null
                )}

                {/* Prideti mygtukai is swipebuttons klases i workcards klase */}
                <div className="swipeButtons">
                    <IconButton className="swipeButtons-repeat" onClick={handleOnSkipClick}>
                        <ReplayIcon fontSize="large"/>
                    </IconButton>
                    <IconButton className="swipeButtons-left" onClick={handleOnDislikeClick}>
                        <CloseIcon fontSize="large"/>
                    </IconButton>
                    <IconButton className="swipeButtons-right" onClick={handleOnLikeClick}>
                        <AssignmentTurnedInIcon fontSize="large"/>
                    </IconButton>
                </div>
            </div>

            <Modal ariaHideApp={false} isOpen={openFullAd} onRequestClose={()=>{setOpenFullAd(false)}}>
                <HighlightOffIcon className="close_button" onClick={()=>{setOpenFullAd(false)}}></HighlightOffIcon>
                <h2>Hello, I'am {user.name}</h2>
                <div className="ad-container">
                        <div className="ad">
                            <div className="ad-header">Biography</div>
                            <div className="ad-info-field">
                                <div className="ad-info-title">{user.bio}</div>
                            </div>
                            <img alt="ad-user-logo" className="ad-user-logo" src={`${user.img}`}></img>
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
                            <div className="ad-header">Information about my job offer</div>
                            <div className="ad-info-field">
                                <div className="ad-info-title">{ad.title}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Job Field</div>
                                <div className="ad-info-value">{ad.job_field}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Position</div>
                                <div className="ad-info-value">{ad.position}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Location</div>
                                <div className="ad-info-value">{ad.location}</div>
                            </div>
                            <div className="ad-info-field">
                                <div className="ad-info-name">Salary</div>
                                <div className="ad-info-value">{ad.salary}</div>
                            </div>
                            <div className="ad-info-field-big">
                                <div className="ad-info-name">Experience</div>
                                <div className="ad-info-value">{ad.experience}</div>
                            </div>
                            <div className="ad-info-field-big">
                                <div className="ad-info-name">Duties</div>
                                <div className="ad-info-value">{ad.duties}</div>
                            </div>
                            <div className="ad-info-field-big">
                                <div className="ad-info-name">Skills</div>
                                <div className="ad-info-value">{ad.skills}</div>
                            </div>
                            <img alt="ad-logo" className="ad-logo" src={`${ad.img}`}></img>
                        </div>
                </div>
            </Modal>
        </div>
    )
}

export default WorkCardsEmployee
