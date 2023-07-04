const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 4000;

require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
});

app.get('/', async (req, res) => {
    const recipientName = 'Richard Roe'
  
    const mailOptions = {
        from: {
            name: process.env.FROM_NAME,
            address: process.env.FROM_EMAIL
        },
        to: 'email@domain.com',
        subject: 'Email test',
        text: 'Email with attahments!', 
        attachments: [
            {   // utf-8 string as an attachment
                filename: 'attachment_1.txt',
                content: `Hello ${recipientName}!`
            },
            {   // file on disk as an attachment
                filename: 'attachment_2.jpg',
                path: __dirname + '/attachments/beach.jpg'
            }             
        ]
    }

    try {
        await transporter.sendMail(mailOptions);

        res.send('Email sent successfully.')
    } catch(error) {
        res.status(500).send('Error: ' + error)
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});