import React, { useEffect, useState } from "react";
import { SideMenu } from "../../components";
import { Logo } from './../../svg'
import Grid from "@mui/material/Grid";
import OtpInput from "react-otp-input";
import './index.css'
import { toast } from "react-toastify";
import axios from "axios";

const BusinessMode = () => {
    const [otp, setOtp] = useState("")
    const [otp_verificaion, setotp_verificaion] = useState(false)


  let agent_token = localStorage.getItem("Agent_access_token")
  


    const handleOtpSubmit = async (enteredOtp) => {
      try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/print-agent/status-otp/${enteredOtp}`,     {
            headers: {
              Authorization: `Bearer ${agent_token}` 
            }
          } 
      
    
    );
  
        console.log("OTP verification response:", response.data);
  toast.success(response.data.message);
  setotp_verificaion(true)

      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message)
          } 
          
          else if(error.message){
            toast.error(error.message);
          }
          else {
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
        <SideMenu otp_verificaion={otp_verificaion} setotp_verificaion={setotp_verificaion} >
            <div className="page-header">
                <div />
                <p>Business Mode</p>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={1} sm={3} md={4} lg={4} xl={4} />
                <Grid item xs={10} sm={6} md={4} lg={4} xl={4}>
                   <div className="business-mode">
                   <img src={Logo} className="business-mode-logo" alt=""/>
                    <p className="business-mode-heading">Welcome</p>
                    <p className="business-mode-text">If you have a confirmation code, please enter it below</p>
                   </div>
                    <div className="otp-div">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            placeholder="0"
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

        </SideMenu>
    );
};
export default BusinessMode;
