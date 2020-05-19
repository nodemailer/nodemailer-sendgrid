export interface SendgridOptions {
  apiKey: string
}

export default function sendgrid(
  options: SendgridOptions
): import('nodemailer').Transport
