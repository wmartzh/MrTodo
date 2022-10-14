import { Rubric } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import client from "../database/client";
import { CustomError, HttpError } from "../types/custom.error";
interface CreateRubric {
  name: string;
  percentage: Decimal;
}

class RubricService {
  /**
   * "Get all tasks for a user."
   *
   * The function takes a userId as an argument and returns a list of tasks
   * @param {number} rubricId - number
   * @returns A promise that resolves to an array of tasks.
   */
  getRubricById(rubricId: number) {
    return client.Rubric.findMany({
      where: {
        id:rubricId,
      },
    });
  }

  /**
   * It creates a new task in the database
   * @param {Rubric} rubric - The task object that you want to create.
   * @returns A promise
   */
  async create(rubric: Rubric) {
    const newRubric = await client.Rubric.create({
      data: {
        name: rubric.name,
        percentage: rubric.percentage,
        createdAt: new Date(),
      },
    });
    if (!newRubric) {
      throw new CustomError("Rubric cannot be created");
    }
    return { message: "Rubric was created successfully" };
  }
}
export default new RubricService();
