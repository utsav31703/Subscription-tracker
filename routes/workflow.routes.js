import { Router} from "express";
import { sendReminders } from "../middlewares/workflow.controller.js";

const workflowRouter=Router()

workflowRouter.post('/',sendReminders)
export default workflowRouter