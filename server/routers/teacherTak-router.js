const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createTask } = require('../controllers/task-controller');



const router = express.Router();

// New route for teacher to assign task
router.post("/assign-task", authMiddleware, roleMiddleware("teacher"), createTask);

module.exports = router;
