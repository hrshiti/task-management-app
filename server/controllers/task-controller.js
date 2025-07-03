

const logAction = require('../auditLogger.js');
const Task = require('../models/task-model.js'); 

const createTask = async (req, res) => {
  const { title, description, deadline, assignedTo } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      deadline,
      assignedTo,
      createdBy: req.user._id,
    });
    console.log("User ID:", req.user?._id);
    await logAction(req.user._id, `Created task "${title}"`);
    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

const getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate('assignedTo', 'username email role')
    .populate('comments.student', 'username'); // Populate student name from comment
  res.status(200).json(tasks);
};
const updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  await logAction(req.user._id, `updated task with ID "${req.params.id}"`);
  res.status(200).json({ message: 'Task updated', updatedTask });
};

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  await logAction(req.user._id, `Deleted task with ID "${req.params.id}"`);
  res.status(200).json({ message: 'Task deleted' });
};
// GET /task/my-tasks
const getStudentTasks = async (req, res) => {
  try {
    const studentId = req.user._id; 

    const tasks = await Task.find({ assignedTo: studentId }).populate('assignedTo', 'username');
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching student tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};
const submitTask = async (req, res) => {
 

 try {
    const { id } = req.params;

    const fileUrl = req.file?.path;
    const filePublicId = req.file?.filename;

    if (!fileUrl) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const task = await Task.findById(id);

    task.submission = {
      fileUrl,
      publicId: filePublicId,
      submittedAt: new Date(),
      student: req.user._id,
    };

    await task.save();

    res.status(200).json({ message: "Task submitted successfully", fileUrl });
  } catch (error) {
    console.error("Submit error:", error);
    res.status(500).json({ message: "Server Error during file upload" });
  }
};

const getSubmittedTasks = async (req, res) => {
  try {
    const submittedTasks = await Task.find({ "submission.status": "submitted" })
      .populate("assignedTo", "username email");
    res.status(200).json(submittedTasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submitted tasks", error });
  }
};

const evaluateTask = async (req, res) => {
  try {
    const { feedback, marks } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task || !task.submission || task.submission.status !== "submitted") {
      return res.status(400).json({ message: "Task is not in submitted state" });
    }

    task.submission.feedback = feedback;
    task.submission.marks = marks;
    task.submission.status = "evaluated";
    await task.save();

    await logAction(req.user._id, `Evaluated task '${task.title}' with ${marks} marks`);

    res.status(200).json({ message: "Evaluation submitted", task });
  } catch (error) {
    res.status(500).json({ message: "Error evaluating task", error });
  }
};
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.comments.push({
      text,
      student: req.user._id,
    });
    await task.save();

    res.status(200).json({ message: 'Comment added successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

module.exports = {
  createTask,
    getTasks,
    updateTask,
    deleteTask,
    getStudentTasks,
    submitTask,
    getSubmittedTasks,
    evaluateTask,
    addComment
};