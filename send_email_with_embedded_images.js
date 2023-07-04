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
    const mailOptions = {
        from: {
            name: process.env.FROM_NAME,
            address: process.env.FROM_EMAIL
        },
        to: 'email@domain.com',
        subject: 'Email test',
        html: 'Email with embedded image: <img src="cid:unique_identifier@domain.com"/>', 
        attachments: [
            {   
                filename: 'image.jpg',
                path: __dirname + '/attachments/beach.jpg',
                cid: 'unique_identifier@domain.com' //same cid value as in the html img src
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