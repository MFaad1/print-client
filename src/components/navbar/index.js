import React, { useEffect, useState } from "react";

import { Logo, Search } from "./../../svg";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import "./index.css";
import Model from "../modal";
import Input from "../input";
import Button from "@mui/material/Button";
import ButtonCom from "../button";

import { Edit, Delete, Close } from "./../../svg";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = ({ onClickSignIn, onClickSignUp }) => {
  let agent_token = localStorage.getItem("use_access_token")
  const [modal, setModal] = useState(false);

  const [cityName, setCityName] = useState( "");
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState( '');
  const [country, setcountry] = useState( '');
  const [location_loading, setlocation_loading] = useState(false)

  const handleSave = async () => {
    const cityDetails = { city: cityName, state, zip_code: zipCode, country };    

      console.log(cityDetails, "city details")

  if (!cityName || !state || !zipCode || !country) {
    toast.error("Please fill in all the required fields.");
    return; 
  }

    try {
      setlocation_loading(true)
      let orders = await axios.post(`${process.env.REACT_APP_API_URL}/customer/add-location`, {location:cityDetails}, {
        headers: {
          Authorization: `Bearer ${agent_token}`
        }
      });
      toast.success("location has been added");
      setModal(false);

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
    } finally {
      setlocation_loading(false)

    }

  };



  return (

    <>
    <Grid container spacing={0}>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
        <div className="navbar-container">
          <button className="navbar-logo">
            <img src={Logo} />
          </button>
          <div>
            {/* <Link className="navbar-explore">Locations</Link> */}
    <p className="navbar-explore navbar-location" onClick={()=>setModal(true)}>Locations</p>

           {/*  <button className="navbar-search">
              <img src={Search} />
            </button> */}
            <button className="navbar-sign-in-btn" onClick={onClickSignIn}>
              Sign in
            </button>
            <button className="navbar-sign-up-btn" onClick={onClickSignUp}>
              Sign up
            </button>
          </div>
        </div>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
    </Grid>



    <Model open={modal} onClose={() => setModal(false)} maxWidth="xs">
        <div className="modal-header">
          <p>Location Details</p>
          <img src={Close} onClick={() => setModal(false)} alt="close" />
        </div>
        {/* <p className="modal-sub-heading">City Details</p> */}

        {/* Controlled Input for City Name */}
        <Input
          title="City Name"
          type="text"
          placeholder="City Name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />

        {/* Controlled Input for State */}
        <Input
          title="State"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        {/* Controlled Input for Zip Code */}
        <Input

          title="Zip Code"
          type="number"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />

        <Input
          title="Country"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setcountry(e.target.value)}
        />

        {/* Save Button */}
 

        <ButtonCom disabled={location_loading} 
        onClick={handleSave}
        title="Save"
        />
        
      </Model>

    </>



  );



};
export default Navbar;
