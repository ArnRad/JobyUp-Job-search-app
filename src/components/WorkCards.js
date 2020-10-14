import React, { useState, useEffect } from 'react'
import WorkCard from "react-tinder-card"
import database from "./firebase"
import "../styles/WorkCards.scss";

function WorkCards() {
    const [people, setPeople] = useState([]);

    //Piece of code which runs based on a condition (BETTER IF)
    useEffect(() => {
        //this is where the code runs
        database.collection('people').onSnapshot(snapshot => (
            setPeople(snapshot.docs.map(doc => doc.data()))
        ))

    }, []); //this will once if no var in []

    return (
        <div>

            <div className="workCard-container">

                {people.map(person => (
                    <WorkCard
                    className="swipe"
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

            </div>
        </div>
    )
}

export default WorkCards
