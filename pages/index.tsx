import { IEventsResponse, ISendEventResponse } from "matrix-js-sdk";
import { useState } from "react";
import { createRoom, getMessages, onInit, sendMessage } from "./api/matrix";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IEventsResponse["chunk"][]>();

  const [roomId, setRoomId] = useState("");
  const [messageData, setMessageData] = useState<ISendEventResponse>();

  const onCreateRoom = () => {
    createRoom({ name, description }).then((data) => {
      setRoomId(data.room_id);
    });
  };

  return (
    <>
      {/* first create an account verify it and then go on and login */}
      <button onClick={() => onInit().then(() => setIsLoggedIn(true))}>
        Login
      </button>
      {/* below state shows the ability to access the matrix ui if logged in */}
      <p>{isLoggedIn ? "logged In" : "logged Out"}</p>
      {/* now add a name and description of the room you want to create */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
      />
      <button onClick={onCreateRoom}>CreateRoom</button>
      {/* show whether you joined the room or some error happened */}
      <p>Joined room {roomId}</p>
      {/* add the message you want to send */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="message"
      />
      <button
        onClick={() =>
          sendMessage(roomId, message).then((data) => {
            setMessageData(data);
            const temp = getMessages(roomId);
            console.log(temp);
          })
        }
      >
        SendMessage
      </button>
      {/* shows data after sent */}
      <p>Data after sending message {messageData?.event_id}</p>
      <button
        onClick={() => {
          console.log("getting...");

          const temp = getMessages(roomId);
          setMessages(temp.messages);
        }}
      >
        getMessages
      </button>
    </>
  );
}
