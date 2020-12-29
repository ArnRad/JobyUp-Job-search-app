import React from 'react';
import "../styles/CategoryButtons.scss";

const CategoryButtons = ({onEmployeeClick, onJobClick}) => {

    return (
        <div className="categoryButtons">
            <button onClick={onJobClick} className="category-button">Job Ads</button>
            <button onClick={onEmployeeClick} className="category-button">Employee Ads</button>
        </div>
    )
}

export default CategoryButtons
