import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home,Dashboard,Orders,DeliverDocuments,BusinessMode,VerifyMode,Bank_details,SupportTicketsForm,Setting } from "../../pages";
const RouterNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/deliver-documents" element={<DeliverDocuments />} />
        <Route path="/bank_details" element={<Bank_details />} />
        <Route path="/business-mode" element={<BusinessMode />} />
        <Route path="/verify-job" element={<VerifyMode />} />
        <Route path="/support-ticket" element={<SupportTicketsForm />} />
        <Route path="/Setting" element={<Setting />} />

        
      </Routes>
    </BrowserRouter>
  );
};
export default RouterNavigation;
