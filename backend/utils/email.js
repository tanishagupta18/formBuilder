const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Tanisha <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    //Render html based on a pug template
    const html = pug.renderFile(`${__dirname}/..views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    //Define email options

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    //Create a transport and send mail
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family');
  }
  async sendPasswordReset() {
    await this.send(
      'Forgot Password',
      'Your password reset token (valid for only 10 mins)'
    );
  }
};
// const sendEmail = async (options) => {
//   //Create a transporter
//   //   const transporter = nodemailer.createTransport({
//   //     service: 'Gmail',
//   //     auth: {
//   //       user: process.env.EMAIL_USERNAME,
//   //       pass: process.env.EMAIL_PASSWORD,
//   //     },
//   //     //Activate in gmail "less secure app" option
//   //   });
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   //Define email options
//   const mailOptions = {
//     from: 'Tanisha <hello@tanisha.io',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     //html
//   };
//   //Actually send email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
