
const express = require('express');


const { createTask, getTasks, updateTask, deleteTask, getStudentTasks, submitTask, getSubmittedTasks, evaluateTask, addComment } = require('../controllers/task-controller');
const authMiddleware = require('../middlewares/auth-middleware');
// const upload = require('../middlewares/uploadMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');

const upload = multer({ storage: storage });

router.post('/create', authMiddleware,roleMiddleware('teacher','admin'), createTask);
router.get('/gettask', authMiddleware, getTasks);
router.put('/update/:id', authMiddleware, updateTask);
router.delete('/delete/:id', authMiddleware, deleteTask);
router.get("/my-tasks", authMiddleware, getStudentTasks);
router.post("/submit/:id", authMiddleware, upload.single("file"), submitTask);

router.get("/submitted", authMiddleware, roleMiddleware('teacher'), getSubmittedTasks);
router.put("/evaluate/:id", authMiddleware, evaluateTask)
router.post('/comment/:id', authMiddleware, addComment);


module.exports = router;
