import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
let Model = ({ open, onClose, maxWidth, children }) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={maxWidth}
      fullWidth
      style={{ backgroundColor: "#1C1C1C80" }}
    >
      <DialogContent dividers>
        <Typography gutterBottom style={{padding:"5px"}}>
        {children}
        </Typography>
      </DialogContent>
    </BootstrapDialog>
  );
};
export default Model;
