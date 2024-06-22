const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
	service: 'GMAIL',
	host: 'smtp.gmail.com',
	secure: true,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS
	},
	from: process.env.GMAIL_USER
})

class sendMail {
	static forgotPassword(email, emailToken) {
		const html = require('./emailTemplate');
		const resetLink = `https://printity.co/reset_password/${emailToken}`;
		transporter.sendMail({
			from: 'Printity',
			to: email,
			subject: 'Printity - Reset Password',
			html: html(email, resetLink)
		});
	}
}


module.exports = sendMail;