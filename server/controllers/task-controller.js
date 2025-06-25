
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
    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

const getTasks = async (req, res) => {
  const tasks = await Task.find().populate('assignedTo', 'username email role');
  res.status(200).json(tasks);
};

const updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ message: 'Task updated', updatedTask });
};
const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
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
  const taskId = req.params.id;
  const file = req.file;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
task.status = "completed";
    task.submission = {
      fileUrl: `/uploads/${file.filename}`,
      status: "submitted",
      submittedAt: new Date()
    };
    await task.save();

    res.status(200).json({ message: "Task submitted successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error submitting task", error });
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


module.exports = {
  createTask,
    getTasks,
    updateTask,
    deleteTask,
    getStudentTasks,
    submitTask,
    getSubmittedTasks
};