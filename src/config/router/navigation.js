import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  OrdersManagement,
  CustomerManagement,
  ManageCities,
  Login,
  Support,
} from "../../pages";
const RouterNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders-management" element={<OrdersManagement />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="/manage-cities" element={<ManageCities />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouterNavigation;
