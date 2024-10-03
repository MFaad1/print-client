import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "./../../svg";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { Input, Button } from "../../components";
import axios from "axios";
const emailRjx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Login = () => {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const loginHandler = async() => {
    if (loginEmail === "") {
      toast.error("Email is required!");
    } else if (!loginEmail.match(emailRjx)) {
      toast.error("Please enter valid email address");
    } else if (loginPassword === "") {
      toast.error("Password is required!");
    } else {

      try {
        let signup_user = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`,{email:loginEmail, password: loginPassword })
        let token = signup_user.data.token
         
        localStorage.setItem("admin_access_token",token )
    
        toast.success("Successfully Logged");
        setLoginEmail("");
        setLoginPassword("");
        navigate("/dashboard");

        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message)
          }
    
          else if (error.message) {
            toast.error(error.message);
          }
          else {
            toast.error("Internal server error");
          } 
        }

      


  
    }
  };


 

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="login-container">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className="login-left"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className="login-right">
                <div>
                  <div className="login-logo">
                    <img src={Logo} />
                  </div>
                  <p className="modal-from-heading">Welcome👋 </p>
                  <p className="modal-from-title">Please login here.</p>

                  <Input
                    password={false}
                    title="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={loginEmail}
                    onChange={(val) => setLoginEmail(val.target.value)}
                  />
                  <Input
                    password={true}
                    title="Password"
                    show={showLoginPassword}
                    type={!showLoginPassword ? "password" : "text"}
                    placeholder="••••••••••••••••"
                    value={loginPassword}
                    onChange={(val) => setLoginPassword(val.target.value)}
                    passwordHideShowHandler={() =>
                      setShowLoginPassword(!showLoginPassword)
                    }
                  />
                  <div className="remember-main">
                    <button onClick={() => setRemember(!remember)}>
                      <div
                        style={{
                          backgroundColor: remember ? "#F7801A" : "#fff",
                        }}
                      >
                        {remember && <FaCheck style={{ color: "#fff" }} />}
                      </div>
                      <p>Remember me</p>
                    </button>

                    <Link className="forget-password-link">
                      Forget Password?
                    </Link>
                  </div>
                  <Button title="Login" onClick={loginHandler} />
                  <p className="modal-form-footer">
                    Don’t have an account?{" "}
                    <Link className="modal-form-footer-link">Sign up</Link>
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};
export default Login;
