import React from 'react';
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import IconButton from "@material-ui/core/IconButton";
import "../styles/SwipeButtons.scss";

function SwipeButtons() {
    return (
        <div className="swipeButtons">
            <IconButton className="swipeButtons-repeat">
                <ReplayIcon fontSize="large"/>
            </IconButton>
            <IconButton className="swipeButtons-left">
                <CloseIcon fontSize="large"/>
            </IconButton>
            <IconButton className="swipeButtons-right">
                <AssignmentTurnedInIcon fontSize="large"/>
            </IconButton>
        </div>
    )
}

export default SwipeButtons
