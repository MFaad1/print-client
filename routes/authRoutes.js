const express = require("express");
const router = express.Router();
const customerAuthRoutes = require("./customer/CustomerAuthRoutes");
const printAgentAuthRoutes = require("./print-agent/printAgentAuthRoutes");

router.use("/customer", customerAuthRoutes);
router.use("/print-agent", printAgentAuthRoutes);

module.exports = router;
