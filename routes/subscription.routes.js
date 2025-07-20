import { Router } from "express";
import { createSubscription, getUserSubscriptions,getAllSubscriptions } from "../controllers/subscription.controlller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter= Router()

subscriptionRouter.get('/',authorize,getAllSubscriptions,(req,res)=>{
    res.send({title:"GET all the subscriptions"})
})
subscriptionRouter.get('/:id',authorize,getUserSubscriptions)
subscriptionRouter.post('/',authorize,createSubscription)
subscriptionRouter.put('/:id',(req,res)=>{
    res.send({title:"UPDATE subscription"})
})
subscriptionRouter.delete('/:id',(req,res)=>{
    res.send({title:"DELETE subscriptions"})
})
subscriptionRouter.get('/user/:id',(req,res)=>{
    res.send({title:"GET all user subscriptions"})
})
subscriptionRouter.put('/:id/cancel',(req,res)=>{
    res.send({title:"CANCEL subscriptions"})
})
subscriptionRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({title:"GET upcoming renewals subscriptions"})
})
export default subscriptionRouter