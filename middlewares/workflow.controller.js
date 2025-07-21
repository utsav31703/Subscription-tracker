import { createRequire } from "module";
import Subscription from "../models/subscription.models.js";
import dayjs from "dayjs";
const require=createRequire(import.meta.url)
const {serve}=require('@upstash/workflow/express')

const REMINDERS=[7,5,2,1];

export const sendReminders=serve(async(context)=>{
    const {subscriptionID} = context.requestPayload;
    const subscription =await fetchSubscription(context,subscriptionID)

    if(!subscription || subscription.status!='active') return;

    const renewalDate= dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for the subscrition ${subscriptionID}. Stopping workflow`);
        return
    }
    for(const daysBefore of REMINDERS){
        const reminderDate=renewalDate.subtract(daysBefore,'day')

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context,`Reminder ${daysBefore} days before`,reminderDate)
        }
        await triggerReminder(context,`Reminder ${daysBefore} days before`)
    }
})
const fetchSubscription=async(context,subscriptionID)=>{
    return await context.run('get subscription', async()=>{
        return Subscription.findById(subscriptionID).populate('user','name email')
    })
}
const sleepUntilReminder=async (context,label,date)=>{
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label,date.toDate())
    
}
const triggerReminder= async (context,label)=>{
    return await context.run(label,()=>{
        console.log(`Triggering ${label} reminder`);
        //send Emails
    })
} 