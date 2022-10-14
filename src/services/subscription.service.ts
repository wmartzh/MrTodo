
import client from "../database/client";
import { CustomError, HttpError } from "../types/custom.error";

class SubscriptionService {
  async updateSubscription(userId: string, subscriptionUpdate: any) {
      //console.log("UserID:",userId);
      try {
        const subscription = await client.subscription.update({
          where:{userId:parseInt(userId)},
          data:{type:subscriptionUpdate}
        });
        if(!subscription){
          throw new HttpError({ message: "Subscription not found" }, 404);
        }else{
          return subscription;
        }
      } catch (error) {
        throw new HttpError({ message: error }, 500);
      }
      //console.log("Subscription:",subscription);

    }
  }
  
  export default new SubscriptionService();