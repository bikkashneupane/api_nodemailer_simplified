import nodemailer from "nodemailer";
// import sgMail from "@sendgrid/mail";

// if using sendgrid/mail independently to send mail
// otherwise this is not necessary with nodemailer
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// global email processor
const emailProcessor = async (bodyObj) => {
  try {
    // createTransport

    // this is with etheral
    // const transporter = nodemailer.createTransport({
    //   host: `${process.env.SMTP_SERVER}`,
    //   port: 587,
    //   secure: false, // Use `true` for port 465, `false` for all other ports
    //   auth: {
    //     user: `${process.env.SMTP_EMAIL}`,
    //     pass: `${process.env.SMTP_PASSWORD}`,
    //   },
    // });

    console.log(bodyObj);
    // with sendGrid
    const transporter = nodemailer.createTransport({
      service: "SendGrid", // must be SendGrid so NodeMailer knows SendGrid is being used
      auth: {
        user: "apikey", // must be literal apikey as string
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    await transporter.sendMail(bodyObj);
  } catch (error) {
    console.log(error);
  }
};

// account verify mail
export const emailVerification = ({ email, url, fullName }) =>
  emailProcessor({
    from: `"Sample Admin 👻" <${process.env.SMTP_EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Verify Account", // Subject line
    text: `Hello ${fullName}, Visit ${url} to verify your account. `, // plain text body
    html: `<h5>Verify Account Now</h5>
      <p>Hello ${fullName} Verify your Account by clicking the below button</p>
      <a href = ${url}>
        <button style={{border:'1px solid black', background:'success'}}>  Verify Account </button>
      </a>
      <p>If the button does not work, got to ${url}</p>`, // html body
  });

// otp mail
export const sendOTP = ({ email, otp }) => {
  return emailProcessor({
    from: `"Bikash Neupane" <${process.env.SMTP_EMAIL}>`,
    to: `${email}`,
    subject: `OTP Request`,
    text: `Your OTP is: ${otp}`,
    html: `<h2>Your OTP is: ${otp}</h2>`,
  });
};
