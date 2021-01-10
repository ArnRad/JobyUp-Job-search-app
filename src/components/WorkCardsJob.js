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

const WorkCardsJob = ({userData}) => {

    const [jobSearch, setJobSearch] = useState([]);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const [openFullAd, setOpenFullAd] = useState(false);
    const [user, setUser] = useState('');
    const [ad, setAd] = useState('');

    const [dislikes, setDislikes] = useState([]);
    const [likes, setLikes] = useState([]);
    let noAdsMessage = "There is no new ad's left for you!";

    useEffect(() => {
        const unsubscribe = fire.firestore().collection('jobSearch').onSnapshot(snapshot => (
            setJobSearch(snapshot.docs.map(doc => doc.data()))
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

            fire.firestore().collection("jobSearch")
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

    const getDisplayAdInfo = () => {
        let adInfo = [];
        for(let i = 0; i < jobSearch.length; i++)
        {
            if(!likes.includes(jobSearch[i].ad_id) && !dislikes.includes(jobSearch[i].ad_id) && jobSearch[i].user_id !== userData.user_id){
                adInfo.adId = jobSearch[i].ad_id;
                adInfo.adUserId = jobSearch[i].user_id;
                adInfo.adUserName = jobSearch[i].user_name;
                adInfo.adUserImg = jobSearch[i].img;
            }
        }
        return adInfo;
    }

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
                {jobSearch.map(job => (!likes.includes(job.ad_id) && !dislikes.includes(job.ad_id) && job.user_id !== userData.user_id) ?
                    <WorkCard
                    className="swipe"
                    onSwipe={(dir) => swiped(dir, job.ad_id, job.user_id, job.user_name, job.img)}
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
                : null ) }
                {liked ? (
                    <img alt="liked" className="action_sign" src={require('../assets/tick.svg')}></img>
                ) : (
                    null
                )}
                {disliked ? (
                    <img alt="disliked" className="action_sign" src={require('../assets/cross.svg')}></img>
                ) : (
                    null
                )}

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
                            <img alt="ad-logo" className="ad-logo" src={`${ad.img}`}></img>
                        </div>
                </div>
            </Modal>
        </div>
    )
}

export default WorkCardsJob
