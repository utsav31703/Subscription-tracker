import { SERVER_URL } from '../config/env.js'
import { workflowClient } from '../config/upstash.js'  
import Subscription from '../models/subscription.models.js'

export const createSubscription=async(req,res,next)=>{
    try {
        const subscription=await Subscription.create({
            ...req.body,
            user:req.user._id,
        })

     const {workflowRunId}=await workflowClient.trigger({
            url:`${SERVER_URL}/api/workflows/subscription/reminder`,
            body:{
                subscriptionId:subscription.id,
            },
            headers:{
               "content-type": "application/json" 
            },
            retries:0,
        })
             if (workflowRunId) {
      subscription.workflowRunId = workflowRunId;
      await subscription.save(); // ✅ Save updated subscription
    }
        res.status(201).json(subscription)
    } catch (error) {
        next(error)
    }
}

export const getUserSubscriptions= async (req,res,next)=>{

    try {
        if(req.user.id!= req.params.id){
            const error=new Error('You are not then owner of this account ');
            error.status=401;
            throw error;
        }
        const subscriptions=await Subscription.find({user:req.params.id})

        res.status(200).json({success:true,data:subscriptions})
    } catch (error) {
        next(error)
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        // Ensure user is authenticated and req.user is available
        const userId = req.user._id;

        const subscriptions = await Subscription.find({ user: userId });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions,
        });
    } catch (error) {
        next(error); // Passes error to global error handler
    }
};
