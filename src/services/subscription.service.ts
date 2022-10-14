import client from "../database/client";

class subscriptionService {
  async updateSubscription(userId: number) {
      console.log("UserID:",userId);
      let subscription = await client.subscription.findFirst({
        where:{userId:userId}
      });
      console.log("Subscription:",subscription);
      
      return "Hello world";
    }
  }
  
  export default new subscriptionService();