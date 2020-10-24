import "./Sidebar.css";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  AddBoxRounded,
  AddCircleOutline,
  ChatBubbleOutline,
  PlusOne,
  RateReviewOutlined,
} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chat, setchat] = useState([]);
  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) => {
      setchat(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const addChat = () => {
    const chatName = prompt("please enter a chat name");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton
          onClick={() => auth.signOut()}
          variant="outlined"
          className="sidebar_input"
        >
          <Avatar src={user.photo} className="siderbar__avatar" />
        </IconButton>

        <div className="sidebar_input">
          <SearchIcon className="searchicon" />
          <input />
        </div>
        <IconButton variant="outlined" className="sidebar_input">
          <AddBoxRounded onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar_chat">
        {chat.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
