// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");

// GET all tasks
router.get("/", async (req, res) => {
	try {
		const tasks = await Task.find();
		console.log("Tasks:", tasks); // Log tasks
		res.json(tasks);
	} catch (err) {
		console.error("Error fetching tasks:", err);
		res.status(500).send("Server Error");
	}
});

// GET a specific task by ID
router.get("/:id", async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) {
			return res.status(404).json({ msg: "Task not found" });
		}
		console.log("Task found:", task); // Log task found
		res.json(task);
	} catch (err) {
		console.error("Error fetching task:", err);
		res.status(500).send("Server Error");
	}
});

// POST a new task
router.post("/", async (req, res) => {
	const { title, description } = req.body;

	try {
		const newTask = new Task({
			title,
			description,
		});
		await newTask.save();
		console.log("New Task created:", newTask); // Log new task
		res.json(newTask);
	} catch (err) {
		console.error("Error creating task:", err);
		res.status(500).send("Server Error");
	}
});

// PUT update a task
router.put("/:id", async (req, res) => {
	try {
		const updatedTask = await Task.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		console.log("Updated Task:", updatedTask); // Log updated task
		res.json(updatedTask);
	} catch (err) {
		console.error("Error updating task:", err);
		res.status(500).send("Server Error");
	}
});

// DELETE a task
router.delete("/:id", async (req, res) => {
	try {
		await Task.findByIdAndRemove(req.params.id);
		console.log("Deleted Task ID:", req.params.id); // Log deleted task ID
		res.json({ msg: "Task removed" });
	} catch (err) {
		console.error("Error deleting task:", err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
