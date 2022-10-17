import { Subject, TaskState, User } from "@prisma/client";
import client from "../database/client";
import { CustomError, HttpError } from "../types/custom.error";

class SubjectService {
  /**
   * It finds a subject by its id and userId, and if it doesn't exist, it throws an error
   * @param {number} userId - The id of the user who owns the subject
   * @param {number} subjectId - number - This is the id of the subject we want to find.
   * @returns The subject that was found.
   */
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
  /**
   * "Get all subject for a user."
   *
   * The function subject a userId as an argument and returns a list of subject
   * @param {number} userId - number
   * @returns A promise that resolves to an array of subject.
   */
  getSubjectByUserId(userId: number) {
    return client.subject.findMany({
      where: {
        userId,
      },
    });
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
   * It subject an id and a subject, and returns the updated subject
   * @param {number} id - The id of the subject to update
   * @param {subject} subject - subject - The subject object that we want to update.
   * @returns The updated subject
   */
  async update(userId: number, id: number, subject: any) {
    const existSubject = await this.findById(userId, id);

    if (!existSubject) {
      throw new HttpError({ message: "Subject doesn't exist" }, 404);
    }
    return client.subject.update({
      where: { id },
      data: { updatedAt: new Date(), ...subject },
    });
  }
}
export default new SubjectService();
