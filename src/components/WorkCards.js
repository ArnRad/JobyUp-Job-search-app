import React, { useState, useEffect } from 'react'
import WorkCard from "react-tinder-card"
import fire from "./firebase"
import "../styles/WorkCards.scss";

const WorkCards = ({userid}) => {

    const [users, setUsers] = useState([]);
    const [jobSearch, setJobSearch] = useState([]);
    const [employeeSearch, setEmployeeSearch] = useState([]);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

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
        fire.firestore().collection('users').onSnapshot(snapshot => (
            setUsers(snapshot.docs.map(doc => doc.data()))
        ))
    }, []);

    console.log(users)
    console.log(jobSearch)
    console.log(employeeSearch)

    const onSwipe = (direction) => {
        if(direction === "left")
        {
        setLiked(false);
        setDisliked(true);
        } else if (direction === "right"){
        setLiked(true);
        setDisliked(false);
        }
        setTimeout(function() {
            setLiked(false);
            setDisliked(false); 
        }, 1000);
    }

    return (
        <div>

            <div className="workCard-container">

                {jobSearch.map(job => (
                    <WorkCard
                    className="swipe"
                    onSwipe={onSwipe}
                    key={job.ad_id}
                    preventSwipe={["up", "down"]}
                    >
                        <div
                        style={{ backgroundImage: `url(${person.url})`}}
                        className="card">
                            <h3>{person.name}</h3>
                        </div>
                    </WorkCard>
                ))}
                {liked ? (
                    <img className="action_sign" src={require('../assets/tick.svg')}></img>
                ) : (
                    <span></span>
                )}
                {disliked ? (
                    <img className="action_sign" src={require('../assets/cross.svg')}></img>
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    )
}

export default WorkCards
