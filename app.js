// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
	.connect("mongodb://localhost:27017/todo-list", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// Routes
app.use("/api/tasks", taskRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = app;
