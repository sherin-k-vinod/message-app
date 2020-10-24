import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";
import db from "./firebase";
import "./SidebarChat.css";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setchatInfo] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setchatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);
  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatID: id,
            chatName: chatName,
          })
        )
      }
      className="sidebar__chat"
    >
      <Avatar src={chatInfo[0]?.photo} />

      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>{chatInfo[0]?.displayName}</small>
      </div>
    </div>
  );
}

export default SidebarChat;
