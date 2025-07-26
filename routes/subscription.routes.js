import { Router } from "express";
import { createSubscription, getUserSubscriptions,getAllSubscriptions, updateSubscription, deleteSubscription, cancelSubscription, getUpcomingRenewals } from "../controllers/subscription.controlller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter= Router()

subscriptionRouter.get('/',authorize,getAllSubscriptions,(req,res)=>{
    res.send({title:"GET all the subscriptions"})
})
subscriptionRouter.get('/:id',authorize,getUserSubscriptions)
subscriptionRouter.post('/',authorize,createSubscription)
subscriptionRouter.put('/:id',updateSubscription)
subscriptionRouter.delete('/:id',deleteSubscription)
subscriptionRouter.get('/user/:id',getUserSubscriptions)
subscriptionRouter.put('/:id/cancel',cancelSubscription)
subscriptionRouter.get('/upcoming-renewals',getUpcomingRenewals)
export default subscriptionRouter