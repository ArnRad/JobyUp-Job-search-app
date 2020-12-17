import React, { useState, useEffect } from 'react'
import WorkCard from "react-tinder-card"
import fire from "./firebase"
import "../styles/WorkCards.scss";

function WorkCards() {
    const [people, setPeople] = useState([]);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    //Piece of code which runs based on a condition (BETTER IF)
    useEffect(() => {
        //this is where the code runs
        const unsubscribe = fire.firestore().collection('people').onSnapshot(snapshot => (
            setPeople(snapshot.docs.map(doc => doc.data()))
        ))

        return () => {
            // this is the cleanup
            unsubscribe();
        }

    }, []); //this will once if no var in []

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

                {people.map(person => (
                    <WorkCard
                    className="swipe"
                    onSwipe={onSwipe}
                    key={person.name}
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
