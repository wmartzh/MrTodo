import { Subscription, SubscriptionType } from "@prisma/client";
import client from "../database/client";
import { CustomError, HttpError } from "../types/custom.error";

type UpdateSubscription = Pick<
  Subscription,
  "detail" | "type" | "expirationDate" | "lastRenew"
>;

class SubscriptionService {
  async create(userId: number) {
    const today = new Date();
    const expirationDate = today;
    expirationDate.setDate(today.getDate() + 100000);
    return client.subscription.create({
      data: {
        userId,
        expirationDate,
        lastRenew: today,
        updatedAt: today,
      },
    });
  }
  async update(userId: number, subscriptionData: UpdateSubscription) {
    try {
      const subscription = await client.subscription.update({
        where: { userId },
        data: {
          updatedAt: new Date(),
          ...subscriptionData,
        },
      });
      if (!subscription) {
        throw new HttpError({ message: "Subscription not found" }, 404);
      } else {
        return subscription;
      }
    } catch (error) {
      throw new HttpError({ message: error }, 500);
    }
  }
  async changeSubscriptionState(userId: number, type: SubscriptionType) {
    let expirationDates = new Date();
    const today = new Date();
    expirationDates.setDate(expirationDates.getDate() + 30);
    this.update(userId, {
      type,
      detail: `Last subscription: ${today.toString()}`,
      expirationDate: expirationDates,
      lastRenew: today,
    });
    const subState =
      type === SubscriptionType.PREMIUM ? "subscribed" : "unsπubscribed";
    return {
      message: `User was ${subState} successfully`,
    };
  }
}

export default new SubscriptionService();
