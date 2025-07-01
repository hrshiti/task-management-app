// utils/auditLogger.js

const AuditLog = require("./models/auditlogs-model");


const logAction = async (userId, action) => {
  try {
    console.log("Attempting to log:", userId, action); // 👀 Check if this runs
    const log = await AuditLog.create({ user: userId, action });
    console.log("✅ Log created:", log);
  } catch (error) {
    console.error("❌ Audit log error:", error.message);
  }
};


module.exports = logAction;
