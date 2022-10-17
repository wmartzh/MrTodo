import { User } from "@prisma/client";
import client from "../database/client";
import subscriptionService from "./subscription.service";
class UserService {
  /**
   * It creates a new user in the database using the data provided in the user argument
   * @param {User} user - User - This is the user object that we're passing in.
   * @returns A promise that resolves to the created user.
   */
  async createUser(user: User) {
    const createdUser = await client.user.create({ data: user });
    await subscriptionService.create(createdUser.id);
    return createdUser;
  }

  /**
   * It returns the first user whose email matches the email argument
   * @param {string} email - string
   * @returns A promise that resolves to a user object.
   */
  findUserByEmail(email: string) {
    return client.user.findFirst({ where: { email } });
  }
}

export default new UserService();
