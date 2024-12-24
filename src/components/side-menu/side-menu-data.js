/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./side-menu-data.css";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, Collapse } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Logo,
  Dashboard,
  Orders,
  DeliverDocuments,
  BusinessMode,
  Notification,
  Calendar,
  VerifyJob,
  bank_details,
  user_setting
} from "./../../svg";

const SideMenuData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const CurrentPagePath = location.pathname;
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));

  // State to manage the open/close state of the Business Mode submenu
  const [openBusinessMode, setOpenBusinessMode] = useState(false);

  const handleBusinessModeClick = () => {
    setOpenBusinessMode(!openBusinessMode);
  };

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
                {/* Dashboard */}
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
                    <img src={Dashboard} alt="Dashboard" />
                    <span className="side-menu-page-title">Dashboard</span>
                  </Button>
                </li>

                {/* Orders */}
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
                    <img src={Orders} alt="Orders" />
                    <span className="side-menu-page-title">Orders</span>
                  </Button>
                </li>

                {/* Deliver Documents */}
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
                    <img src={DeliverDocuments} alt="Deliver Documents" />
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
                    <img src={bank_details} alt="Deliver Documents" style={{ height: "25px", width: "25px" }} />
                    <span className="side-menu-page-title">
                      Bank Details                    </span>
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
                    <img src={user_setting} alt="Deliver Documents" style={{ height: "25px", width: "25px" }} />
                    <span className="side-menu-page-title">
                    Setting                   </span>
                  </Button>
                </li>

                {/* Business Mode - Main Heading */}
                <li className="side-menu-list-item">
                  <Button
                    variant="text"
                    className={
                      CurrentPagePath === "/businessmode" ||
                        CurrentPagePath === "/verifyjob"
                        ? "side-menu-active-page"
                        : "side-menu-page"
                    }
                    onClick={handleBusinessModeClick}
                  >
                    <img src={BusinessMode} alt="Business Mode" />

                    <span className="side-menu-page-title">Business Mode</span>
                    {openBusinessMode ? <ExpandLess /> : <ExpandMore />}
                  </Button>

                  {/* Submenu */}
                  <Collapse in={openBusinessMode} timeout="auto" unmountOnExit>
                    <ul className="side-menu-sub-ul">
                      {/* Agent Mode */}
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
                          <img src={Calendar} alt="" />

                          <span className="side-menu-page-title">
                            Agent Availability
                          </span>
                        </Button>
                      </li>

                      {/* Verify Job */}
                      <li className="side-menu-list-item">
                        <Button
                          variant="text"
                          className={
                            CurrentPagePath === "/verify-job"
                              ? "side-menu-active-page"
                              : "side-menu-page"
                          }
                          onClick={() => {
                            navigate("/verify-job");
                          }}
                        >
                          <img src={VerifyJob} alt="" />

                          <span className="side-menu-page-title">
                            Verify Job
                          </span>
                        </Button>
                      </li>
                    </ul>
                  </Collapse>
                </li>
              </ul>
            </div>

            {/* Footer */}
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
