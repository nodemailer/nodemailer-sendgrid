/* eslint no-console: 0*/
'use strict';

const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('../index'); // require('nodemailer-sendgrid');
const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);

transport
    .sendMail({
        from: 'andris@kreata.ee',
        to: 'Andris Reinman <andris.reinman@gmail.com>, andris@ethereal.email',
        subject: 'hello world',
        html: '<h1>Hello world!</h1>'
    })
    .then(([res]) => {
        console.log('Message delivered with code %s %s', res.statusCode, res.statusMessage);
    })
    .catch(err => {
        console.log('Errors occurred, failed to deliver message');

        if (err.response && err.response.body && err.response.body.errors) {
            err.response.body.errors.forEach(error => console.log('%s: %s', error.field, error.message));
        } else {
            console.log(err);
        }
    });
