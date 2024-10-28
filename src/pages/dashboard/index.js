import React, { useEffect, useState } from "react";

import { SideMenu, LineChart, ActivityChart } from "../../components";
import Grid from "@mui/material/Grid";
import "./index.css";
import { Graph } from "./../../svg";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
const Dashboard = () => {
  let agent_token = localStorage.getItem("Agent_access_token");
  const [ordersList, setOrdersList] = useState();

  const [loading, setloading] = useState(false);

  const get_Customers = async () => {
    try {
      if (!agent_token) throw new Error("Please re-login and try again");
      setloading(true);
      let orders = await axios.get(
        `${process.env.REACT_APP_API_URL}/print-agent/summary`,
        {
          headers: {
            Authorization: `Bearer ${agent_token}`,
          },
        }
      );
      console.log("orders", orders["business_name"]);
      console.log("orders", orders.business_name);

      setOrdersList(orders.data);
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
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    get_Customers();
  }, []);

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

      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className="dashboard-box">
                  <p className="dashboard-box-heading">Active Users</p>
                  <p className="dashboard-box-value">
                    {ordersList && ordersList.totalCustomers}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className="dashboard-box">
                  <p className="dashboard-box-heading">Total Files</p>

                  <p className="dashboard-box-value">
                    {ordersList && ordersList.totalPagesPrinted}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className="dashboard-box">
                  <p className="dashboard-box-heading">Total Payment</p>
                  <p className="dashboard-box-value">
                    $ {ordersList && ordersList.totalRevenue}
                  </p>
                </div>
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className="dashboard-box">
                  <p className="dashboard-box-heading">Orders</p>
                  <p className="dashboard-box-value">
                    {ordersList && ordersList.totalOrders}
                  </p>
                </div>
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className="dashboard-box">
                  <p className="dashboard-box-heading">Total Complete Jobs</p>
                  <p className="dashboard-box-value">
                    {ordersList && ordersList.totalCompletedJobs}
                  </p>
                </div>
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className="dashboard-box">
                  <p className="dashboard-box-heading">Total Pending Jobs</p>
                  <p className="dashboard-box-value">
                    {ordersList && ordersList.totalPendingJobs}
                  </p>
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
      )}
    </SideMenu>
  );
};
export default Dashboard;
