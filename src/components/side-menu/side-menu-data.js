import React, { useEffect, useState } from "react";
import "./side-menu-data.css";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Logo, Dashboard,Orders,CustomerManagement,ManageCities ,Support} from "./../../svg";
const SideMenuData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let CurrentPagePath = location.pathname;
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      {isMatch ? (
        <div></div>
      ) : (
        <div
          className="side-menu-container"
          style={{ position: isMatch ? "" : "fixed" }}
        >
          <div className="sider-content-wraper">
            <div className="side-menu-logo-container">
              <img src={Logo} alt="Logo" />
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
                    <span className="side-menu-page-title">dashboard</span>
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
                    <span className="side-menu-page-title">orders management</span>
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
                    <span className="side-menu-page-title">customer management</span>
                  </Button>
                </li>



                <li className="side-menu-list-item">
                  <Button
                    variant="text"
                    className={
                      CurrentPagePath === "/agent-management"
                        ? "side-menu-active-page"
                        : "side-menu-page"
                    }
                    onClick={() => {
                      navigate("/agent-management");
                    }}
                  >
                    <img src={CustomerManagement} />
                    <span className="side-menu-page-title">Agent management</span>
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
                    <span className="side-menu-page-title">manage cities</span>
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
                    <span className="side-menu-page-title">support</span>
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
                <span className="side-menu-page-title">Log Out</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SideMenuData;
