import React,{useState, useEffect} from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";

import InfoBar from "./../InfoBar/InfoBar";
import Input from "./../Input/Input";
import Messages from "./../Messages/Messages";
import TextContainer from "./../TextContainer/TextContainer";

let socket;

const Chat = ({location}) => {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState(''); //state for a sinlge message
    const [messages, setMessages] = useState([]);   //state for storing messages and displaying them in realtime
    const ENDPOINT = 'https://anon-chats-app.herokuapp.com/';

    useEffect(() => {
        const {name,room} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        // console.log(location.search);
        //  console.log(name,room);
        socket.emit("join", {name, room}, () => {});  /*socket.io emit function that emits an event with the string passed
                                                        as the identifier to the socket with any other data args
                                                        third parameter is a callback that can be used for error handling or 
                                                        basically events fired right after the event is emitted*/
        return () => {
            socket.emit("disconnect");
                                                    /*here, the return from useEffect is basically componentDidUnmount state  
                                                    and using the disconnect event inside it along with the socket.off method which 
                                                    closes the particular socket instance marks the end of a user session 
                                                    per say, user has left the chat room.
                                                    */ 
            socket.off()
        }

    },[ENDPOINT,location.search]);                  /*the second paramater in the useEffect hook is an array of those objects or variables
                                                    which runs only when change is detecteed in the passed objects/variables
                                                    */

    //useEffect hook for handling messages 

    useEffect(() => {
        socket.on("message",(message) => {
            setMessages([...messages, message]);                //adding the message sent into the pile of sent messages with spread and not pushing it since state is not Mutable
        })

        socket.on("roomData", ({users}) => {
            setUsers(users);
        })
    },[messages])

    //function for sending messages
    
    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }

    } 

    console.log(message,messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar roomName={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <div>
                <TextContainer users={users}/>
            </div>
        </div>
    )
}

export default Chat; 
