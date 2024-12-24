/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from "react";
import { Model, SideMenu } from "../../components";
import { Logo } from "../../svg";
import Grid from "@mui/material/Grid";
import OtpInput from "react-otp-input";
import "./index.css";
import { toast } from "react-toastify";
import axios from "axios";
import Print from "./Print";
import { useReactToPrint } from "react-to-print";
import { Visibility } from "@mui/icons-material";

const VerifyMode = () => {
  const [otp, setOtp] = useState("");
  const [otp_verificaion, setotp_verificaion] = useState(false);
  const [fileUrl, setfileUrl] = useState(false);
  const [model, setmodel] = useState(false);
  const componentRef = useRef(null);
  const iframeRef = useRef();

  let agent_token = localStorage.getItem("Agent_access_token");

  const handleAfterPrint = () => { };

  const handleBeforePrint = () => {
    const iframe = componentRef.current.querySelector("iframe");
    return Promise.resolve();
  };

  const printFn = useReactToPrint({
    contentRef: componentRef,
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const handleOtpSubmit = async (enteredOtp) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/printjob/complete-print-job`,
        { confirmation_code: enteredOtp },
        {
          headers: {
            Authorization: `Bearer ${agent_token}`,
          },
        }
      );

      console.log("OTP verification response:", response.data);
      // toast.success(response.data.message);

      if (response.data.printJob && response.data.printJob.file_path) {
        setfileUrl(response.data.printJob);
        setmodel(true);
        setTimeout(() => {
          printFn();
        }, 2500);
      }

      setotp_verificaion(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleOtpSubmit(otp);
    }
  }, [otp]);

  return (
    <SideMenu>
      <div className="page-header-main">
        <div className="page-header">
          <div />
          <p>Verify Job</p>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={1} sm={3} md={4} lg={4} xl={4} />
          <Grid item xs={10} sm={6} md={4} lg={4} xl={4}>
            <div className="business-mode">
              <img src={Logo} className="business-mode-logo" alt="" />
              <p className="business-mode-heading">Verify Your Job</p>
              <p className="business-mode-text">
                If you have a confirmation code, please enter it below
              </p>
            </div>
            <div className="otp-div">
              <OtpInput
                className="intput-class"
                value={otp}
                onChange={setOtp}
                placeholder={"0".repeat(otp)}
                numInputs={6}
                renderInput={(props) => <input {...props} placeholder="0" />}
                isInputNum={true}
                shouldAutoFocus={true}
                containerStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                inputStyle="otp-input"
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={1} sm={3} md={4} lg={4} xl={4} />
        </Grid>

      </div>


      {/* <Model open={model} onClose={()=>setmodel(false)}>
<Print fileUrl ={fileUrl} ref={componentRef} />
</Model>
 : null} */}

      <div className="print-content" style={{ opacity: "0", objectFit: 'contain' }}>
        {fileUrl ? <Print fileUrl={fileUrl} ref={componentRef} /> : null}
      </div>
    </SideMenu>
  );
};
export default VerifyMode;
