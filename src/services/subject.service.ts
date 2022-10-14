import { Subject, User } from "@prisma/client";
import client from "../database/client";
import { CustomError } from "../types/custom.error";
interface CreateTask {
  name: string;
  detail?: string;
  color?: string;
}
class SubjectService {
  // static create(user: any, subjectData: any): any {
  //   throw new Error("Method not implemented.");
  // }
  /**
   * It creates a new task in the database
   * @param {Subject} subject - The task object that you want to create.
   * @returns A promise
   */
  async create(user: User, subject: Subject) {
    const newSubject = await client.subject.create({
      data: {
        name: subject.name,
        detail: subject.detail,
        color: subject.color,
        userId: user.id,
        updatedAt: new Date(),
      },
    });
    if (!newSubject) {
      throw new CustomError("Subject cannot created");
    }
    return { message: "Subject was created successfully" };
  }

  getSujectByUserId(userId: number) {
    return client.subject.findMany({
      where: {
        userId,
      },
    });
  }
}
export default SubjectService;
