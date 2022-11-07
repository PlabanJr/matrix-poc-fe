import { ISendEventResponse } from "matrix-js-sdk";
import { useEffect, useState } from "react";
import { createRoom, onInit, sendMessage } from "./api/matrix";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const [roomId, setRoomId] = useState("");
  const [messageData, setMessageData] = useState<ISendEventResponse>();
  // onInit();
  useEffect(() => {
    // service.sendMessage("!ielVhbjhuurTVrpCXh:matrix.org", "hello new message");
    // service.createRoom({ name: "new world", description: "hello" });
  }, []);
  const onCreateRoom = () => {
    createRoom({ name, description }).then((data) => {
      setRoomId(data.room_id);
    });
  };

  return (
    <>
      <button onClick={() => onInit().then(() => setIsLoggedIn(true))}>
        Login
      </button>
      <p>{isLoggedIn ? "logged In" : "logged Out"}</p>
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
      <p>Joined room {roomId}</p>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="message"
      />
      <button
        onClick={() =>
          sendMessage(roomId, "my new message").then((data) => {
            setMessageData(data);
          })
        }
      >
        SendMessage
      </button>
      <p>Data after sending message {messageData?.event_id}</p>
    </>
  );
}
