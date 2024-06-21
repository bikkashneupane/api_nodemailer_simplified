import { createTransport } from "nodemailer";

// createTransport
const transport = createTransport({});

// global sendEmail
const sendMail = () => createTransport.sendMail({});
