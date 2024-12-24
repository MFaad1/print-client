/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import SideMenuData from "./side-menu-data";
import { Grid, IconButton, Collapse, List, ListItem } from "@mui/material";
import "./index.css";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Logo,
  Search2,
  Notification,
  Dashboard,
  Orders,
  DeliverDocuments,
  BusinessMode,
  Calendar,
  VerifyJob,
  bank_details,
  user_setting
} from "./../../svg";
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
  const [businessModeOpen, setBusinessModeOpen] = useState(false); // State for submenu
  let agent_token = localStorage.getItem("Agent_access_token");

  const online_offline_toggler = async () => {
    try {
      let otp = await axios.get(
        `${process.env.REACT_APP_API_URL}/print-agent/online-status`,
        {
          headers: {
            Authorization: `Bearer ${agent_token}`,
          },
        }
      );

      toast.success(otp.data.message);
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

  const toggler = () => {
    if (props.otp_verificaion) {
      setIsOnline(!isOnline);
      props.setotp_verificaion(false);
    }
  };


  useEffect(() => {
    toggler();
  }, [props.otp_verificaion]);

  const handleBusinessModeClick = () => {
    setBusinessModeOpen(!businessModeOpen);
  };

  

  return (
    <>
      <div >
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
                      className="side-menu-header"
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
                                  <img src={Dashboard} alt="" />
                                  <span className="side-menu-page-title">
                                    Dashboard
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
                                  <img src={Orders} alt="" />
                                  <span className="side-menu-page-title">
                                    Orders
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
                                  <img src={DeliverDocuments} alt="" />
                                  <span className="side-menu-page-title">
                                    Deliver Documents
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/bank_details"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/bank_details");
                                  }}
                                >
                                  <img src={bank_details} alt=""   style={{height:"25px", width: "25px"}}/>
                                  <span className="side-menu-page-title">
                                    Bank Details
                                  </span>
                                </Button>
                              </li>

                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/setting"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/setting");
                                  }}
                                >
                                  <img src={user_setting} alt=""   style={{height:"25px", width: "25px"}}/>
                                  <span className="side-menu-page-title">
                                    Setting
                                    </span>
                                </Button>
                              </li>



                              {/* Business Mode Dropdown */}
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className="side-menu-page"
                                  onClick={handleBusinessModeClick}
                                  endIcon={
                                    businessModeOpen ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )
                                  }
                                >
                                  <img src={BusinessMode} alt="" />
                                  <span className="side-menu-page-title">
                                    Business Mode
                                  </span>
                                </Button>
                                <Collapse
                                  in={businessModeOpen}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <List component="div" disablePadding>
                                    <ListItem
                                      button
                                      className={
                                        CurrentPagePath === "/business-mode"
                                          ? "side-menu-active-page sub-menu-item"
                                          : "side-menu-page sub-menu-item"
                                      }
                                      onClick={() => {
                                        navigate("/business-mode");
                                      }}
                                    >
                                      <img src={Calendar} alt="" />
                                      <span className="side-menu-page-title">
                                        Agent Availability
                                      </span>
                                    </ListItem>
                                    <ListItem
                                      button
                                      className={
                                        CurrentPagePath === "/verify-job"
                                          ? "side-menu-active-page sub-menu-item"
                                          : "side-menu-page sub-menu-item"
                                      }
                                      onClick={() => {
                                        navigate("/verify-job");
                                      }}
                                    >
                                      <img src={VerifyJob} alt="" />
                                      <span className="side-menu-page-title">
                                        Verify Job
                                      </span>
                                    </ListItem>
                                  </List>
                                </Collapse>
                              </li>

                              <br />
                            </ul>
                          </div>
                          <div className="side-menu-footer-container">
                            <Button
                              variant="text"
                              className={"side-menu-page"}
                              onClick={() => {
                                localStorage.removeItem("Agent_access_token");
                                navigate("/");
                              }}
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
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={isOnline}
                          onChange={() => {
                            // setIsOnline(!isOnline)
                            online_offline_toggler();
                          }}
                        />
                        <span className="slider round"></span>
                      </label>
                      <p>{isOnline ? "Online" : "Offline"}</p>
                    </div>

                    <div>
                      {/* <Button variant="text" className="side-menu-profile">
                        <img
                          src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
                          alt=""
                        />
                      </Button> */}
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
