const Repository = require("./Repository").requestClient();
const baseUrl = require("./Repository").baseUrl;

class TasksRepository {
  constructor() {}

  async list(filter) {
    try {
      let res = [];

      await Repository.get(`${baseUrl}/tasks`).then(
        (response) => (res = response.data)
      );
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  async get_Task(id) {
    try {
      const url = `${this.baseUrl}/tasks/${id}`;

      let res = {};

      await this.repository.get(url).then((response) => (res = response.data));

      return res;
    } catch (e) {
      console.error(e);
    }
  }

  async create(data) {
    const url = `${this.baseUrl}/tasks`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async removeById(id) {
    const url = `${this.baseUrl}/tasks/${id}`;

    const response = await fetch(url, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}
module.exports = TasksRepository;
