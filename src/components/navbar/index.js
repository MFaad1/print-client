/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Logo, Search } from "./../../svg";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import "./index.css";

import AvatarDemo from "../../components/Avatar/AvatarDemo";



const Navbar = ({ onClickSignIn, onClickSignUp }) => {

  const [user, setuser] = useState()


  useEffect(() => {
    const handle_loggedin_user = () => {
      const user = JSON.parse(localStorage.getItem("loggedIn_user"));
      if(user){
        setuser(user) 

      } else{
        setuser(null) 

      }
    };
  
    window.addEventListener("logged_user", handle_loggedin_user);
  
    return () => {
      window.removeEventListener("logged_user", handle_loggedin_user);
    };
  }, []);



useEffect(() => {
     const user = JSON.parse(localStorage.getItem("loggedIn_user"));
      if(user){
        setuser(user) 

      }
}, [])



  return (

    <>
    <Grid container spacing={0}>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
        <div className="navbar-container">
          <button className="navbar-logo">
            <img src={Logo} alt="" />
          </button>
          <div>
            {/* <Link className="navbar-explore">Locations</Link> */}
    {/* <p className="navbar-explore navbar-location">Locations</p> */}

           {/*  <button className="navbar-search">
              <img src={Search} />
            </button> */}

            {
              // true
              user
               ? <AvatarDemo name ={user.full_name.charAt(0)}/> : 
              <>
            <button className="navbar-sign-in-btn" onClick={onClickSignIn}>
              Sign in
            </button>
            <button className="navbar-sign-up-btn" onClick={onClickSignUp}>
              Sign up
            </button>
              </>
            }
          </div>
        </div>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
    </Grid>



    </>



  );



};
export default Navbar;
