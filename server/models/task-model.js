
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submission: {
  fileUrl: String,
  status: {
    type: String,
    enum: ["pending", "submitted", "evaluated"],
    default: "pending"
  },
  submittedAt: Date,
  feedback: String,
  marks: Number
},
comments: [
  {
    text: String,
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }
],


}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
