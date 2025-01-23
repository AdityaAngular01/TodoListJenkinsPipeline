// models/taskModel.js
const mongoose = require("mongoose");

// Define task schema
const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

// Create Task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
