import React from "react";
import "./Imessage.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
function Imessage() {
  return (
    <div className="imessage">
      {/* sidebar and history  */}
      <Sidebar />
      {/* chatbox */}
      <Chat />
    </div>
  );
}

export default Imessage;
