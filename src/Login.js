import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://i.pinimg.com/originals/60/d4/d3/60d4d31e4f2b18abaee11da6281ff6ea.png"
          alt="logo"
        />{" "}
        <h1>iMessage</h1>
      </div>

      <Button onClick={signIn}>sign in</Button>
    </div>
  );
}

export default Login;
