const express = require('express');
const nodemailer = require('nodemailer');
const ical = require('ical-generator');

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
    const calendar = new ical.ICalCalendar({ name: 'Team meeting' });
    
    const startTime = new Date();

    const endTime = new Date();
    endTime.setHours(startTime.getHours() + 1);
    
    calendar.createEvent({
        start: startTime,
        end: endTime,
        summary: 'Team meeting - summary',
        description: 'Team meeting - description',
        location: 'Remote',
        organizer: 'John Doe <johndoe@domain.io>',
        url: 'https://www.somewebsite.com'
    })      

    const mailOptions = {
        from: {
            name: process.env.FROM_NAME,
            address: process.env.FROM_EMAIL
        },
        to: 'email@domain.com',
        subject: 'Email test',
        text: 'Appointment in attach',
        icalEvent: {
            method: 'REQUEST',
            content: new Buffer.from(calendar.toString())
        }
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