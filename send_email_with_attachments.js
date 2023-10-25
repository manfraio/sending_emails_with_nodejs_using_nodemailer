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
        text: 'Email with attachments!' ,
        attachments: [
            {   // utf-8 string as an attachment
                filename: 'attachment_1.txt',
                content: `Hello user, this is a text file!`
            },
            {   // file on disk as an attachment
                filename: 'attachment_2.jpg',
                path: __dirname + '/attachments/beach.jpg'
            }             
        ]         
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(`Error: ${err}`)
        }

        return console.log(`Email sent successfully. Info: ${JSON.stringify(info)}`)
    })
};

sendEmail()