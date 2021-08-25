const AllowedChoicesTaskEnum = require("../shared/enums/AllowedChoicesTaskEnum");
const getTimeSince = require("../shared/utils/getTimeSince");
const TasksRepository = require("../repositories/TasksRepository");

class TaskService {
  constructor() {}

  async create({ description, priority, tag }) {
    const allowedPriorities = new Set(AllowedChoicesTaskEnum.PRIORITIES);

    if (priority && !allowedPriorities.has(priority)) {
      throw new Error(
        `Cannot accept a priority that in not among the following options: ${Array.from(
          allowedPriorities
        )}`
      );
    }
    const tasksRepository = new TasksRepository();

    const task = await tasksRepository.create({
      description,
      priority,
      tag,
    });

    return task;
  }

  async delete(id) {
    if (!id) {
      throw new Error(`Cannot delete a task without providing an id.`);
    }
    const tasksRepository = new TasksRepository();

    const task = await tasksRepository.removeById(id);

    if (!task) {
      throw new Error(`A task with the id {${id}} does not exist.`);
    }

    task.age = getTimeSince(task.timestamp);

    return task;
  }

  async list(status = false, tag = undefined) {
    const tasksRepository = new TasksRepository();

    const tasks = await tasksRepository.list("");
    let filteredTasks;

    if (status || tag) {
      filteredTasks = tasks.filter((task) => {
        let hasMatched = true;

        if (status && task.status !== status) {
          hasMatched = false;
        }
        if (tag && !("tag" in task)) {
          hasMatched = false;
        }
        if (
          tag &&
          "tag" in task &&
          task.tag.toLowerCase() !== tag.toLowerCase()
        ) {
          hasMatched = false;
        }
        return hasMatched;
      });
    } else {
      filteredTasks = tasks;
    }

    const mappedTasks = filteredTasks.map((task) => {
      task.age = getTimeSince(task.timestamp);
      return task;
    });

    return mappedTasks;
  }
}

module.exports = TaskService;
