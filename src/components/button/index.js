import React from "react";
import Button from "@mui/material/Button";
import "./index.css";
const ButtonCom = ({ title, onClick ,disabled}) => {
  return (
    <Button className="button" onClick={onClick} disabled={disabled}>
      <p>{title}</p>
    </Button>
  );
};
export default ButtonCom;
