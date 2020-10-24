import { IconButton } from "@material-ui/core";
import { MicNoneOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import { selectChatId, selectChatName } from "./features/chatSlice";
import db from "./firebase";
import Message from "./Message";
import { selectUser } from "./features/userSlice";
import { firestore } from "firebase";
import FlipMove from "react-flip-move";

function Chat() {
  const [input, setinput] = useState("");
  const user = useSelector(selectUser);
  const chatName = useSelector(selectChatName);
  const chatID = useSelector(selectChatId);
  const [messages, setmessage] = useState([]);

  useEffect(() => {
    if (chatID) {
      db.collection("chats")
        .doc(chatID)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessage(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatID]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats")
      .doc(chatID ? chatID : "QM8E0vOZfcOK4BxxmV0f")
      .collection("messages")
      .add({
        timestamp: firestore.FieldValue.serverTimestamp(),

        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });
    setinput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          to: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>

      <div className="chat__input">
        <form>
          <input
            placeholder="type a message"
            value={input}
            onChange={(e) => setinput(e.target.value)}
          ></input>
          <button onClick={sendMessage}>send message</button>
        </form>
        <IconButton>
          <MicNoneOutlined />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
