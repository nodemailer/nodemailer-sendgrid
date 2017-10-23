# nodemailer-sendgrid

SendGrid transport object for Nodemailer.

> Requires Nodemailer v4.3.0+

This module is mostly meant to demonstrate the usage of `mail.normalize(cb)` method in Nodemailer v4.3. This allows creating HTTP API based transports for Nodemailer much easier.

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/riRUvXLoy7hDEa8ptqPY9cHd/nodemailer/nodemailer-sendgrid'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/riRUvXLoy7hDEa8ptqPY9cHd/nodemailer/nodemailer-sendgrid.svg' />
</a>

## Usage

### Install from NPM

    npm install nodemailer nodemailer-sendgrid

### Create Nodemailer transport

```javascript
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const transport = nodemailer.createTransport(nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY
}));
```

### Send a message

Message objects support the entire Nodemailer API. In addition you can provide SendGrid specific keys like `templateId` or `sendAt`.

```javascript
transport.sendMail({
    from: 'sender@example.com',
    to: 'Receiver Name <receiver@example.com>, someother@example.com',
    html: '<h1>Hello world!</h1>'
});
```

## License

**MIT**
