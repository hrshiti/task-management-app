
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submission: {
  fileUrl: { type: String },  
  status: { type: String, enum: ['pending', 'submitted'], default: 'pending' },
  submittedAt: { type: Date }
}

}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
