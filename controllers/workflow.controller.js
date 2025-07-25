import { createRequire } from "module";
import Subscription from "../models/subscription.models.js";
import dayjs from "dayjs";
import { sendReminderEmail } from "../utils/send.email.js";
const require=createRequire(import.meta.url)
const {serve}=require('@upstash/workflow/express')

const REMINDERS=[7,5,2,1];

export const sendReminders=serve(async(context)=>{
    
 
    const {subscriptionId} = context.requestPayload;
    const subscription =await fetchSubscription(context,subscriptionId)

    if(!subscription || subscription.status!='active') return;

    const renewalDate= dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for the subscription ${subscriptionId}. Stopping workflow`);
        return
    }
    for(const daysBefore of REMINDERS){
        const reminderDate=renewalDate.subtract(daysBefore,'day')

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context,`Reminder ${daysBefore} days before reminder`,reminderDate)
            
        }
        console.log(`Reminder ${daysBefore} days before`);
        
        if(dayjs().isSame(reminderDate,'day')){
            await triggerReminder(context,`${daysBefore} days before reminder`,subscription)
        }
           
    }
})
const fetchSubscription=async(context,subscriptionId)=>{
    return await context.run('get subscription',async()=>{
        return Subscription.findById(subscriptionId).populate('user','name email')
    })
}
const sleepUntilReminder=async (context,label,date)=>{
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label,date.toDate())
    
}
const triggerReminder= async(context,label,subscription)=>{
    return await context.run(label,async()=>{
          console.log(`[${new Date().toISOString()}] 🔔 Triggering ${label}  for subscription `);

        //send Emails
        await sendReminderEmail({
            to:subscription.user.email,
            type:label,
            subscription
        })
    })
} 