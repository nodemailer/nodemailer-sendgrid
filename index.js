'use strict';

const packageData = require('./package.json');
const sgMail = require('@sendgrid/mail');

class SendGridTransport {
    constructor(options) {
        this.options = options || {};
        this.name = packageData.name;
        this.version = packageData.version;
        if (options.apiKey) {
            sgMail.setApiKey(options.apiKey);
        }
    }

    send(mail, callback) {
        mail.normalize((err, source) => {
            if (err) {
                return callback(err);
            }

            let msg = {};
            Object.keys(source || {}).forEach(key => {
                switch (key) {
                    case 'subject':
                    case 'text':
                    case 'html':
                        msg[key] = source[key];
                        break;
                    case 'from':
                    case 'replyTo':
                        msg[key] = []
                            .concat(source[key] || [])
                            .map(entry => ({
                                name: entry.name,
                                email: entry.address
                            }))
                            .shift();
                        break;
                    case 'to':
                    case 'cc':
                    case 'bcc':
                        msg[key] = [].concat(source[key] || []).map(entry => ({
                            name: entry.name,
                            email: entry.address
                        }));
                        break;
                    case 'attachments':
                        {
                            let attachments = source.attachments.map(entry => {
                                let attachment = {
                                    content: entry.content,
                                    filename: entry.filename,
                                    type: entry.contentType,
                                    disposition: 'attachment'
                                };
                                if (entry.cid) {
                                    attachment.content_id = entry.cid;
                                    attachment.disposition = 'inline';
                                }
                                return attachment;
                            });

                            msg.attachments = [].concat(msg.attachments || []).concat(attachments);
                        }
                        break;
                    case 'alternatives':
                        {
                            let alternatives = source.alternatives.map(entry => {
                                let alternative = {
                                    content: entry.content,
                                    type: entry.contentType
                                };
                                return alternative;
                            });

                            msg.content = [].concat(msg.content || []).concat(alternatives);
                        }
                        break;
                    case 'icalEvent':
                        {
                            let attachment = {
                                content: source.icalEvent.content,
                                filename: source.icalEvent.filename || 'invite.ics',
                                type: 'application/ics',
                                disposition: 'attachment'
                            };
                            msg.attachments = [].concat(msg.attachments || []).concat(attachment);
                        }
                        break;
                    case 'watchHtml':
                        {
                            let alternative = {
                                content: source.watchHtml,
                                type: 'text/watch-html'
                            };
                            msg.content = [].concat(msg.content || []).concat(alternative);
                        }
                        break;
                    case 'normalizedHeaders':
                        msg.headers = msg.headers || {};
                        Object.keys(source.normalizedHeaders || {}).forEach(header => {
                            msg.headers[header] = source.normalizedHeaders[header];
                        });
                        break;
                    case 'messageId':
                        msg.headers = msg.headers || {};
                        msg.headers['message-id'] = source.messageId;
                        break;
                    default:
                        msg[key] = source[key];
                }
            });

            if (msg.content && msg.content.length) {
                if (msg.text) {
                    msg.content.unshift({ type: 'text/plain', content: msg.text });
                    delete msg.text;
                }
                if (msg.html) {
                    msg.content.unshift({ type: 'text/html', content: msg.html });
                    delete msg.html;
                }
            }

            sgMail.send(msg, callback);
        });
    }
}

module.exports = options => new SendGridTransport(options);
