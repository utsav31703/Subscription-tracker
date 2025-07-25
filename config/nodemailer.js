import nodemailer from 'nodemailer'

import { EMAIL_PASSWORD } from './env.js'
export const accoundEmail='tempo9986@gmail.com'
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:accoundEmail,
        pass:EMAIL_PASSWORD
    }
})
export default transporter;