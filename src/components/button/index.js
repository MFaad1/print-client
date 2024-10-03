import React from "react";
import Button from "@mui/material/Button";
import "./index.css";
const ButtonCom = ({ title, onClick }) => {
  return (
    <Button className="button" onClick={onClick}>
      <p>{title}</p>
    </Button>
  );
};
export default ButtonCom;
