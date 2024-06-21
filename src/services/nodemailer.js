import nodemailer from "nodemailer";

const emailProcessor = async (bofyObj) => {
  try {
    // createTransport
    const transporter = nodemailer.createTransport({
      host: `${process.env.SMTP_SERVER}`,
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: `${process.env.SMTP_EMAIL}`,
        pass: `${process.env.SMTP_PASSWORD}`,
      },
    });

    await transporter.sendMail(bofyObj);
  } catch (error) {
    console.log(error);
  }
};

// global sendEmail
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
