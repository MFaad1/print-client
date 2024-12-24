import React from "react";
import Button from "@mui/material/Button";
import "./index.css";
const ButtonCom = ({ title, onClick ,disabled, type}) => {
  return (
    <Button className="button" onClick={onClick} disabled={disabled} type={type ? type : 'button'}>
      <p>{title}</p>
    </Button>
  );
};
export default ButtonCom;
