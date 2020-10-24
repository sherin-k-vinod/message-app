import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Message.css";
import { forwardRef } from "react";

const Message = forwardRef(
  (
    { id, contents: { timestamp, displayName, email, message, photo, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`messages ${user.email === email && "messages__sender"}`}
      >
        <Avatar src={photo} className="messages__photo" />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);

export default Message;
