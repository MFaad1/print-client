import React from "react";
import Button from "@mui/material/Button";
import "./index.css";
import { Google ,Apple} from "./../../svg";
const SocialButton = ({ title }) => {
  return (
    <div>
      <div className="or-main">
        <div />
        <p>or</p>
        <div />
      </div>
      <Button  className="social-button">
        <img src={Google} />
        <p>Continue with Google</p>
      </Button>
      <Button  className="social-button">
        <img src={Apple} />
        <p>Continue with Apple</p>
      </Button>
    </div>
  );
};
export default SocialButton;
