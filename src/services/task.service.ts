import { Task, TaskState, User } from "@prisma/client";
import client from "../database/client";
import { CustomError, HttpError } from "../types/custom.error";
interface CreateTask {
  name: string;
  description?: string;
  dueDate?: string;
}

class TaskService {
  /**
   * It finds a task by its id and userId, and if it doesn't exist, it throws an error
   * @param {number} userId - The id of the user who owns the task
   * @param {number} taskId - number - This is the id of the task we want to find.
   * @returns The task that was found.
   */
  async findById(userId: number, taskId: number) {
    const task = await client.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });
    if (!task) {
      throw new HttpError({ message: "Task not found" }, 404);
    }
    return task;
  }

  /**
   * "Get all tasks for a user."
   *
   * The function takes a userId as an argument and returns a list of tasks
   * @param {number} userId - number
   * @returns A promise that resolves to an array of tasks.
   */
  getTaskByUserId(userId: number) {
    return client.task.findMany({
      where: {
        userId,
      },
    });
  }

  /**
   * It creates a new task in the database
   * @param {Task} task - The task object that you want to create.
   * @returns A promise
   */
  async create(user: User, task: Task) {
    const newTask = await client.task.create({
      data: {
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
        state: TaskState.ACTIVE,
        userId: user.id,
        updatedAt: new Date(),
      },
    });
    if (!newTask) {
      throw new CustomError("Task cannot created");
    }
    return { message: "Task was created successfully" };
  }

  /**
   * It takes an id and a task, and returns the updated task
   * @param {number} id - The id of the task to update
   * @param {Task} task - Task - The task object that we want to update.
   * @returns The updated task
   */
  async update(userId: number, id: number, task: any) {
    if (
      task.state &&
      !Object.values(TaskState).includes(task.state as TaskState)
    ) {
      throw new HttpError({ message: "Invalid State" }, 400);
    }
    const existTask = await this.findById(userId, id);

    if (!existTask) {
      throw new HttpError({ message: "Task doesn't exist" }, 404);
    }
    return client.task.update({
      where: { id },
      data: { updatedAt: new Date(), ...task },
    });
  }

  /**
   * If the state is not a valid state, throw an error, otherwise update the task with the new state.
   * @param {number} userId - The id of the user who owns the task
   * @param {number} taskId - The id of the task to be updated.
   * @param {string} state - string
   * @returns The updated task
   */
  async changeState(userId: number, taskId: number, state: string) {
    const result = await this.update(userId, taskId, { state });

    if (!result) {
      throw new HttpError({ error: "Tasks couldn't update correctly" }, 500);
    }
    return { message: "Task was updated correctly" };
  }
}

export default new TaskService();
