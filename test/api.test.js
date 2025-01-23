const request = require("supertest");
const app = require("../app");
const { expect } = require("chai");

describe("To-Do List API", () => {
	let taskId;
	let deleteTaskID;

	// Test POST /api/tasks (Create Task)
	it("should create a new task", async () => {
		const res = await request(app).post("/api/tasks").send({
			title: "Test Task",
			description: "This is a test task",
		});

		expect(res.status).to.equal(200);
		expect(res.body).to.have.property("title", "Test Task");
		taskId = res.body._id; // Save the taskId for further tests
	});

	// Test GET /api/tasks (Get All Tasks)
	it("should get all tasks", async () => {
		const res = await request(app).get("/api/tasks");

		expect(res.status).to.equal(200);
		expect(res.body).to.be.an("array");
		expect(res.body.length).to.be.greaterThan(0); // Ensure at least one task exists
		deleteTaskID = res.body[0]._id; // Save the first taskId for further deletion test
	});

	// Test GET /api/tasks/:id (Get Task by ID)
	it("should get a specific task by ID", async () => {
		const res = await request(app).get(`/api/tasks/${taskId}`);

		expect(res.status).to.equal(200);
		expect(res.body).to.have.property("title", "Test Task");
		expect(res.body).to.have.property("_id", taskId); // Ensure correct task is returned
	});

	// Test PUT /api/tasks/:id (Update Task)
	it("should update a task", async () => {
		const res = await request(app).put(`/api/tasks/${taskId}`).send({
			completed: true,
		});

		expect(res.status).to.equal(200);
		expect(res.body.completed).to.equal(true); // Check if task's 'completed' field is updated
	});

	// Test DELETE /api/tasks/:id (Delete Task)
	it("should delete a task", async () => {
		const res = await request(app).delete(`/api/tasks/${deleteTaskID}`);

		expect(res.status).to.equal(200);
		expect(res.body).to.have.property("msg", "Task removed"); // Ensure task is deleted successfully
	});
});
