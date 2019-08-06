if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.port || 3000;


app.use( express.json() );
app.use( express.static('dist') );

app.get('/', (req, res) => {
	res.static('index.html')
})

app.post('/sendContactEmail', (req, res) => {
	console.log(req.body)
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.email,
			pass: process.env.password,
		}
	});

	const message = `
		You've got a new lead:<br><br>
		Name: ${req.body.name}<br>
		Email: ${req.body.email}<br>
		Message: ${req.body.message}`
	;
	
	let mailOptions = {
		from: {
			name: req.body.name, // Show the sender's name in the email
			address: process.env.email,
		},
		to: process.env.contactEmail,
		subject: req.body.subject,
		html: message, // Parse the body string as HTML instead of plain text
	};
	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error sending', error)
			res.send({message: 'Error Sending Email!'});
		}
		else {
			console.log('Email sent')
			res.send({message: 'Email Sent!'}); // Resolve the promise if the email sent successfully
		}
	})
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))