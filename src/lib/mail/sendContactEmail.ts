import 'server-only'

import nodemailer from 'nodemailer';

interface ContactMailInput {
    name: string,
    email: string,
    message: string,
}

function getRequiredEnv(name: string): string {
    const value = process.env[name]

    if (!value) {
        throw new Error(`Missing environment vairable: ${name}`);
    }

    return value
}


const smtpUser = getRequiredEnv('YANDEX_SMTP_USER')
const smtpPassword = getRequiredEnv('YANDEX_SMTP_PASSWORD')
const contactEmailTo = getRequiredEnv('CONTACT_EMAIL_TO')

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465,
    secure: true,
    auth: {
        user: smtpUser,
        pass: smtpPassword,
    }
})


export async function sendContactEmail({
    name,
    email,
    message
}: ContactMailInput) {
    await transporter.sendMail({
        from: `"Portfolio contact" <${smtpUser}>`,
        to: contactEmailTo,
        replyTo: email,
        subject: `Portfolio message from ${name}`,
        text: [
            `Name: ${name}`,
            `Email: ${email}`,
            '',
            message
        ].join('\n'),
        disableFileAccess: true,
        disableUrlAccess: true

    })
}

