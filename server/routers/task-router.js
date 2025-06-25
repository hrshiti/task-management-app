
const express = require('express');


const { createTask, getTasks, updateTask, deleteTask, getStudentTasks, submitTask, getSubmittedTasks } = require('../controllers/task-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const upload = require('../middlewares/uploadMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware ');
const router = express.Router();

router.post('/create', authMiddleware, createTask);
router.get('/gettask', authMiddleware, getTasks);
router.put('/update/:id', authMiddleware, updateTask);
router.delete('/delete/:id', authMiddleware, deleteTask);
router.get("/my-tasks", authMiddleware, getStudentTasks);
router.post("/submit/:id", authMiddleware, upload.single("file"), submitTask);

router.get("/submitted", authMiddleware, roleMiddleware('teacher'), getSubmittedTasks);



module.exports = router;
