# nodemailer-sendgrid

SendGrid transport object for Nodemailer.

## Warning, vendor lock-in ahead!

Using provider APIs like SendGrid might result in a vendor lock-in, especially if you are using provider specific features. So always consider if you would
prefer to use SMTP based services instead where vendor lock-ins do not happen.

Switching from a SMTP based provider to another is much easier (you do need to edit some DNS settings at least) than switching API based providers where you
probably have a lot of custom code targeting your existing provider.

This module is specially designed to be as much compatible with Nodemailer as possible, so if you do not touch the Sendgrid specific configuration options then
switching from SendGrid API to any other provider should be just as easy as switching from SMTP.

## Usage

> Requires Nodemailer v4.3.0+

This module is mostly meant to demonstrate the usage of `mail.normalize(cb)` method in Nodemailer v4.3. This allows creating HTTP API based transports for
Nodemailer much easier.

### Install from NPM

    npm install nodemailer nodemailer-sendgrid

### Create Nodemailer transport

```javascript
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);
```

See [full example](./examples/mail.js).

### Send a message

Message objects support the entire Nodemailer API. In addition you can provide SendGrid specific keys like `templateId` or `sendAt`.

```javascript
transport.sendMail({
    from: 'sender@example.com',
    to: 'Receiver Name <receiver@example.com>, someother@example.com',
    subject: 'hello world',
    html: '<h1>Hello world!</h1>'
});
```

## License

**MIT**
