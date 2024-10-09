import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home,Dashboard,Orders,DeliverDocuments,BusinessMode,VerifyMode } from "../../pages";
const RouterNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/deliver-documents" element={<DeliverDocuments />} />
        <Route path="/business-mode" element={<BusinessMode />} />
        <Route path="/verify-job" element={<VerifyMode />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouterNavigation;
