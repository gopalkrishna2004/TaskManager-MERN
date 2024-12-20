const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Task', TaskSchema);
