import { Subscription, SubscriptionType } from "@prisma/client";
import client from "../database/client";
import { CustomError, HttpError } from "../types/custom.error";

type UpdateSubscription = Pick<
  Subscription,
  "detail" | "type" | "expirationDate" | "lastRenew"
>;

class SubscriptionService {
  private setExpirationDate(subType: SubscriptionType) {
    const newDate = new Date();
    const amountOfDays = subType === SubscriptionType.PREMIUM ? 30 : 10000; //10000 is an arbitrary number
    newDate.setDate(newDate.getDate() + amountOfDays);
    return newDate;
  }
  async create(userId: number) {
    const today = new Date();
    const expirationDate = this.setExpirationDate(SubscriptionType.FREE);
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
    let expirationDates = this.setExpirationDate(type);
    const today = new Date();

    this.update(userId, {
      type,
      detail: `Last subscription: ${today.toString()}`,
      expirationDate: expirationDates,
      lastRenew: today,
    });
    const subState =
      type === SubscriptionType.PREMIUM ? "subscribed" : "unsubscribed";
    return {
      message: `User was ${subState} successfully`,
    };
  }
}

export default new SubscriptionService();
