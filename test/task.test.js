// test/task.test.js
const chai = require("chai");
const expect = chai.expect;
const Task = require("../models/taskModel");

describe("Task Model", () => {
	it("should create a new task", async () => {
		const task = new Task({
			title: "Unit Test Task",
			description: "Unit test description",
		});

		const savedTask = await task.save();

		expect(savedTask).to.have.property("_id");
		expect(savedTask.title).to.equal("Unit Test Task");
		expect(savedTask.description).to.equal("Unit test description");
	});

	it("should fail without title", async () => {
		const task = new Task({
			description: "No title provided",
		});

		try {
			await task.save();
		} catch (err) {
			expect(err.errors.title).to.exist;
		}
	});
});
