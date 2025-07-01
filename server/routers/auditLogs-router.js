// routes/auditRoutes.js
const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const AuditLog = require("../models/auditlogs-model");
const router = express.Router();



router.get("/audit", authMiddleware, async (req, res) => {
  try {
    const logs = await AuditLog.find().populate("user", "username email").sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching audit logs" });
  }
});

module.exports = router;
