import { User } from "@prisma/client";
import client from "../database/client";
class UserService {
  /**
   * It creates a new user in the database using the data provided in the user argument
   * @param {User} user - User - This is the user object that we're passing in.
   * @returns A promise that resolves to the created user.
   */
  async createUser(user: User) {
    //client.subscription.create();
    let renewalDates = new Date();

    let expirationDates = new Date();
    expirationDates.setDate(expirationDates.getDate() + 30);
    let createdUser = await client.user.create({ data: user });
    let subscription = await client.subscription.create({
      data: { userId: createdUser.id,
        expirationDate: expirationDates,
        lastRenew: renewalDates,
       } 
    });
    //console.log(createdUser.id);
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
