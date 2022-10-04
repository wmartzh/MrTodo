import { User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { HttpError } from "../types/custom.error";
import userService from "./user.service";
import * as jwt from "jsonwebtoken";
import { promisify } from "util";
class AuthService {
  /**
   * It takes a password, generates a salt, and then hashes the password with the salt
   * @param {string} password - The password to hash.
   * @returns The hashed password.
   */
  private hashPassword(password: string) {
    const saltRounds = genSaltSync(10);

    return hashSync(password, saltRounds);
  }

  /**
   * It takes a hash and a password, and returns true if the password matches the hash
   * @param {string} hash - The hashed password from the database
   * @param {string} password - The password that the user entered in the login form.
   * @returns A boolean value.
   */
  private validatePassword(hash: string, password: string) {
    return compareSync(password, hash);
  }

  /**
   * It generates a JWT token with the user's email as the payload, the secret key as the key, and the
   * expiration time as the options
   * @param {User} user - User - The user object that we want to generate the token for.
   * @returns A promise that resolves to a string.
   */
  private generateAccessToken(user: User) {
    const { EXPIRATION_TOKEN, SECRET } = process.env;
    const promise: (payload: any, key: string, options: any) => Promise<any> =
      promisify(jwt.sign).bind(jwt);
    return promise(
      {
        email: user.email,
      },
      SECRET || "",
      {
        expiresIn: EXPIRATION_TOKEN || "1d",
      }
    );
  }

  /**
   * It takes a user object, removes the password property, hashes the password, and then creates a new
   * user with the hashed password and the rest of the properties
   * @param {User} user - User - the user object that is passed in from the controller
   * @returns The userService.createUser method is being returned.
   */
  register(user: User) {
    const { password, ...rest } = user;
    return userService.createUser({
      password: this.hashPassword(password),
      ...rest,
    });
  }

  /**
   * It takes an email and password, finds the user in the database, checks if the password matches, and
   * if it does, it generates an access token
   * @param {string} email - The email of the user
   * @param {string} password - The password that the user entered in the login form.
   * @returns { accessToken }
   */
  async login(email: string, password: string) {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new HttpError("User doesn't exist", 404);
    }
    if (!this.validatePassword(user.password, password)) {
      throw new HttpError("Password doesn't match", 401);
    }
    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }
}
export default new AuthService();
