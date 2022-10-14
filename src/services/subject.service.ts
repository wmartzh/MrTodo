import { Subject, User } from "@prisma/client";
import client from "../database/client";
import { CustomError, HttpError } from "../types/custom.error";
interface CreateSubject {
  name: string;
  detail?: string;
  color?: string;
}
class SubjectService {
  async findById(userId: number, subjectId: number) {
    const subject = await client.subject.findFirst({
      where: {
        userId,
        id: subjectId,
      },
    });
    if (!subject) {
      throw new HttpError({ message: "Subject not found" }, 404);
    }
    return subject;
  }

  // static create(user: any, subjectData: any): any {
  //   throw new Error("Method not implemented.");
  // }
  /**
   * It creates a new subject in the database
   * @param {Subject} subject - The subject object that you want to create.
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

  /**
   * "Get all subject for a user."
   *
   * The function subject a userId as an argument and returns a list of subject
   * @param {number} userId - number
   * @returns A promise that resolves to an array of subject.
   */
  getSujectByUserId(userId: number) {
    return client.subject.findMany({
      where: {
        userId,
      },
    });
  }
}
export default SubjectService;