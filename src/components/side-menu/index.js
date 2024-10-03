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
import {
  Logo,
  Search2,
  Notification,
  Dashboard,
  Orders,
  CustomerManagement,
  ManageCities,
  Support,
} from "./../../svg";
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
                                    CurrentPagePath === "/orders-management"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/orders-management");
                                  }}
                                >
                                  <img src={Orders} />
                                  <span className="side-menu-page-title">
                                    orders management
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/customer-management"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/customer-management");
                                  }}
                                >
                                  <img src={CustomerManagement} />
                                  <span className="side-menu-page-title">
                                    customer management
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/manage-cities"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/manage-cities");
                                  }}
                                >
                                  <img src={ManageCities} />
                                  <span className="side-menu-page-title">
                                    manage cities
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/support"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/support");
                                  }}
                                >
                                  <img src={Support} />
                                  <span className="side-menu-page-title">
                                    support
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
                              onClick={() => {
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
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={isOnline}
                          onChange={() => setIsOnline(!isOnline)}
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
