const express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { userName, city, address, phone, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sw824146@gmail.com', 
      pass: '111111111' //כרגע סיסמא לא נכונה למניעת חשיפת הסיסמא, כדי שיעבוד צריך לשנות לסיסמא האמיתית
    }
  });

  const mailOptions = {
    from: 'sw824146@gmail.com',
    to: 'sw824146@gmail.com', 
    subject: 'פנייה חדשה מטופס קשר',
    text: `
      שם: ${userName}
      מייל: ${email}
      טלפון: ${phone}
      כתובת: ${city}, ${address}

      נושא: ${userName}
      תוכן: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
