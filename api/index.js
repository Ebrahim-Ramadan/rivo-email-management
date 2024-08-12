require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.Gmail_ACC, // Your Gmail address
    pass: process.env.apppassword, // Your Application-specific password 
  },
});

const subject = 'DONOT REPLY - Order Confirmation | Rivo Gallery';
const emailContentTemplate = `
<div>
  <div>
    Dear [clientName]
  </div>
  <div>
  You've got great taste! We're thrilled you chose 
  <span>
  <a href='https://e-commerce-myass.vercel.app'>RIVO</a>
  </span>
  .
  </div>
  <div>
  Your order,
  <span>
  <a href='https://e-commerce-myass.vercel.app/orders?id=[orderID]'>[orderID]</a>
  </span>
  , is now under our care and is being processed by our crew.
  </div>
  <div>We'll notify you by email when your items are dispatched and ready for delivery. For precise delivery dates or to track and manage your order, please check your 'Order Summary'.</div>
  <a href='https://e-commerce-myass.vercel.app/orders'>View Orders Summary</a>
 

<div>
<img src='https://lh3.googleusercontent.com/a-/ALV-UjW0d-5_0GPPnlvExjAFxhFyxAFm1CO2QXtbZ8hVVR4CqJkKnrI=s40-p' width='50px' height='50px' />
</div>
</div>
`;

app.post('/send-email', (req, res) => {
  console.log('req.body', req.body);
  const { email, orderID, clientName, secret_token } = req.body;

  if (!email || !clientName || !orderID) {
    return res.status(400).json({ error: 'Email, orderID, and clientName are required' });
  }
  if (!secret_token || secret_token !=process.env.secret_token) {
    return res.status(400).json({ error: 'You are not authorized' });
  }


  let emailContent = emailContentTemplate.replace(/\[clientName\]/g, clientName);
  emailContent = emailContent.replace(/\[orderID\]/g, orderID);

  const mailOptions = {
    from: process.env.Gmail_ACC,
    to: email,
    subject: subject,
    html: emailContent,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email to ${email}: ${error}`);
      return res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log(`Email sent to ${email}: ${info.response}`);
      return res.status(200).json({ message: `Email sent to ${email} successfully` });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;