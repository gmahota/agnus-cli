const TaskService = require("../services/TaskService");

const joinInput = require("../shared/utils/joinInput");
const renderTasks = require("../shared/utils/renderTasks");
const askForConfirmation = require("../shared/utils/askForConfirmation");

const MessageColorEnum = require("../shared/enums/MessageColorEnum");

class TasksController {
  constructor() {}

  async create(description, priorityOption, tag) {
    try {
      const parsedDescription = joinInput(description, " ");

      const taskService = new TaskService();
      await taskService.create({
        description: parsedDescription,
        priority: priorityOption,
        tag,
      });

      console.log(MessageColorEnum.SUCCESS(`New task added successfully.`));
    } catch (error) {
      console.error(MessageColorEnum.ERROR(error.message));
    }
  }

  async delete(id) {
    try {
      const parsedId = parseInt(id);

      if (Number.isNaN(parsedId)) {
        throw new Error("Cannot provide a non-numeric value for the id.");
      }

      const questionMessage = `Are you sure you want to delete the task with id ${parsedId}?`;
      const answer = await askForConfirmation(questionMessage);

      if (answer) {
        const deleteTask = new TaskService(this.tasksRepository);

        await deleteTask.delete(parsedId);

        console.log(MessageColorEnum.SUCCESS("Task deleted successfully."));
      } else {
        console.log(MessageColorEnum.WARNING("Operation aborted."));
      }
    } catch (error) {
      console.error(MessageColorEnum.ERROR(error.message));
    }
  }

  async index(status, tag, showDate) {
    try {
      const listTasks = new TaskService();
      const tasks = await listTasks.list(status, tag);

      if (tasks.length <= 0) {
        console.log(MessageColorEnum.WARNING("No tasks have been registered."));
      } else {
        renderTasks(tasks, tag, showDate);
      }
    } catch (error) {
      console.error(MessageColorEnum.ERROR(error.message));
    }
  }
}

module.exports = TasksController;
