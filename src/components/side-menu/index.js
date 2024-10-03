import React, { useState, useEffect } from "react";
import SideMenuData from "./side-menu-data";
import { Grid, IconButton } from "@mui/material";
import "./index.css";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Logo, Search2, Notification ,Dashboard,Orders,DeliverDocuments ,BusinessMode } from "./../../svg";
import { toast } from "react-toastify";

import axios from "axios";
export const SideMenu = (props) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  let CurrentPagePath = location.pathname;
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const [isOnline, setIsOnline] = useState(true);
  let agent_token = localStorage.getItem("Agent_access_token")


const online_offline_toggler =async()=>{
  try {
    
  let otp = await axios.get(`${process.env.REACT_APP_API_URL}/print-agent/online-status`,
     {
    headers: {
      Authorization: `Bearer ${agent_token}` 
    }


  });

  toast.success(otp.data.message);


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
}

const toggler =()=>{
  if(props.otp_verificaion){
    setIsOnline(!isOnline)
    props.setotp_verificaion(false)
  }
}

console.log(props.otp_verificaion,"otp_verificaion" )

useEffect(()=>{
  toggler()
},[props.otp_verificaion])


  return (
    <>
      <div>
        <Grid container>
          <Grid item xs={12} md={2}>
            <SideMenuData />
          </Grid>
          <Grid item xs={12} lg={10}>
            <div className="right-side-container">
              <div className="right-side-header-container">
                <div className="right-side-header-content-wrapper">
                  <div>
                    {isMatch ? (
                      <div>
                        <IconButton
                          onClick={() => {
                            setIsDrawerOpen(true);
                          }}
                        >
                          <MenuIcon />
                        </IconButton>
                      </div>
                    ) : (
                      <div> </div>
                    )}

                    <Drawer
                      anchor="left"
                      open={isDrawerOpen}
                      onClose={handleDrawerClose}
                    >
                      <div>
                        <div className="sider-content-wraper">
                          <div
                            className="drawer-header-main"
                            style={{ paddingRight: "20px" }}
                          >
                            <img src={Logo} alt="Logo" />
                            <IconButton
                              onClick={() => {
                                handleDrawerClose();
                              }}
                              className="app-bar-component-drawer-close-btn"
                            >
                              <CloseIcon />
                            </IconButton>
                          </div>
                          <div className="side-menu-data-list-main">
                            <ul className="side-menu-ul">
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/dashboard"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/dashboard");
                                  }}
                                >
                                  <img src={Dashboard} />
                                  <span className="side-menu-page-title">
                                    dashboard
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/orders"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/orders");
                                  }}
                                >
                                  <img src={Orders} />
                                  <span className="side-menu-page-title">
                                  orders
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/deliver-documents"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/deliver-documents");
                                  }}
                                >
                                  <img src={DeliverDocuments} />
                                  <span className="side-menu-page-title">
                                  Deliver Documents
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/business-mode"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/business-mode");
                                  }}
                                >
                                  <img src={BusinessMode} />
                                  <span className="side-menu-page-title">
                                  Business Mode
                                  </span>
                                </Button>
                              </li>
                              <br />
                            </ul>
                          </div>
                          <div className="side-menu-footer-container">
                            <Button
                              variant="text"
                              className={"side-menu-page"}
                              // onClick={() => {
                              //   navigate("/settings");
                              // }}
                            >
                              <LogoutOutlinedIcon />
                              <span className="side-menu-page-title">
                                Log Out
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Drawer>
                  </div>

                  <div className="side-menu-header">
                    <div className="header-online">
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={isOnline}
                          onChange={() =>{
                            // setIsOnline(!isOnline)
                            online_offline_toggler()
                          }
                            
                          
                          
                          }
                        />
                        <span class="slider round"></span>
                      </label>
                      <p>{isOnline ? "Online" : "Offline"}</p>
                    </div>

                    <div>
                      <Button variant="text" className="side-menu-notificatin">
                        <img src={Search2} />
                      </Button>
                      <Button variant="text" className="side-menu-notificatin">
                        <img src={Notification} />
                      </Button>
                      <Button variant="text" className="side-menu-profile">
                        <img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" />
                      </Button>
                    </div>
                  </div>


                </div>
              </div>
              <div className={"side-menu-children-data"}>{props.children}</div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SideMenu;
