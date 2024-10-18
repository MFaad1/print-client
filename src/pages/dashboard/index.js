import React from "react";
import { SideMenu, LineChart, ActivityChart } from "../../components";
import Grid from "@mui/material/Grid";
import "./index.css";
import { Graph } from './../../svg'
const Dashboard = () => {
    return (
        <SideMenu>
            <div className="page-header">
                <div />
                <p>Dashboard</p>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <div className="dashboard-header-dropdown">
                        <p>Timeframe:</p>
                        <select>
                            <option>All</option>
                            <option>A</option>
                        </select>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <div className="dashboard-header-dropdown">
                        <p>People:</p>
                        <select>
                            <option>All</option>
                            <option>A</option>
                        </select>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <div className="dashboard-header-dropdown">
                        <p>Topic:</p>
                        <select>
                            <option>All</option>
                            <option>A</option>
                        </select>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <div className="dashboard-box">
                                <p className="dashboard-box-heading">Active Users</p>
                                <p className="dashboard-box-value">287<span>/800</span></p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <div className="dashboard-box">
                                <p className="dashboard-box-heading">Total Files</p>
                                <p className="dashboard-box-value">3,298</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <div className="dashboard-box">
                                <p className="dashboard-box-heading">Total Payment</p>
                                <p className="dashboard-box-value">$10K</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <div className="dashboard-box">
                                <p className="dashboard-box-heading">Traffic</p>
                                <p className="dashboard-box-value">64%</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <div className="dashboard-box">
                                <p className="dashboard-box-heading">Current Month Sale</p>
                                <p className="dashboard-box-value">86%</p>
                                <img src={Graph} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={1} lg={4} xl={4}>
                            <div className="dashboard-box">
                                <p className="dashboard-box-heading">Current Year Sale</p>
                                <p className="dashboard-box-value">+34%</p>
                                <img src={Graph} />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                    <div className="dashboard-box">
                        <div className="dashboard-activity-main">
                            <p>Activity</p>
                            <select>
                                <option>Month</option>
                            </select>
                        </div>
                        <ActivityChart />
                    </div>
                </Grid>
            </Grid>
        </SideMenu>
    );
};
export default Dashboard;
