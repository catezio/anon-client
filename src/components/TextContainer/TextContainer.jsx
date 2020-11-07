import React from "react";

import "./TextContainer.css";
import onlineIcon from "../../icons/onlineIcon.png";

const TextContainer = ({users}) => {
    return (
        users ? (
            <div className="textContainer">
                <h1>users currently online</h1>
                <div className="activeContainer">
                <h2>
                    {users.map(({name}) => (
                        <div key={name} className="activeItem">
                        <img alt="online icon" src={onlineIcon} />
                        {name}
                        </div>
                    ))}
                </h2>
                </div>
            </div>
        ) : null
    );
}
export default TextContainer;