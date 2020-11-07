import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import "./Join.css";

const Join = () => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    
    const checkFields = (event) => {
       return (!name || !room) ? event.preventDefault() : null;     //for validating the button click whether user entered the required fields to proceed further
    }

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={checkFields} to={`/chat?name=${name}&room=${room}`}>  {/* react-router component that connects the chat component with this Join component*/}
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}
export default Join;