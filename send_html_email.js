const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "",
      pass: ""
    }
});

function sendEmail() {
    const mailOptions = {
        from: {
            name: 'John Doe',
            address: 'john.doe@domain.com'
        },
        to: 'user@domain.com',
        subject: 'Email test',
        html: `
            <h3 style="color: #36ba9b;">Hello user,</h3>
            <p style="color: #555;">This email was sent using Node.js with <b>Nodemailer</b></p>
            <p style="color: #ccc; font-weight: bold;">Regards, <br>John Doe</p>
        `
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(`Error: ${err}`)
        }

        return console.log(`Email sent successfully. Info: ${JSON.stringify(info)}`)
    })
};

sendEmail()