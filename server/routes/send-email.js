const express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const Product = require('../models/product');

router.post('/', async (req, res) => {
  const { firstName, lastName, phone, email, subject, content } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sw824146@gmail.com',
      pass: 'thac lbda hiry cmvr' //כרגע סיסמא לא נכונה למניעת חשיפת הסיסמא, כדי שיעבוד צריך לשנות לסיסמא האמיתית
    }
  });

  const mailOptions = {
    from: 'sw824146@gmail.com',
    to: 'sw824146@gmail.com',
    subject: 'פנייה חדשה מטופס צור קשר',
    text: `
      ${firstName} :שם
      ${lastName} :משפחה
      ${email} :מייל
      ${phone} :טלפון
      ${subject} :נושא
      ${content} :תוכן 
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

router.post('/delete/:id', async (req, res) => {
  const productId = req.params.id;
  // console.log(productId);
  try {
    const product = await Product.findOne({ _id: productId });
    // console.log(product);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sw824146@gmail.com',
        pass: 'thac lbda hiry' //כרגע סיסמא לא נכונה למניעת חשיפת הסיסמא, כדי שיעבוד צריך לשנות לסיסמא האמיתית
      }
    });

    const mailOptions = {
      from: 'sw824146@gmail.com',
      to: 'sw824146@gmail.com',
      subject: "הודעה על פרסום שאינו רלוונטי",
      html: `
      <div style="font-size: 15px; color: blue;" dir = "rtl">
      <p>מספר מזהה: ${product._id}</p>
      <p>נתוני הפרסום:</p>
      <p>שם: ${product.name}</p>
      <p>עיר: ${product.city}</p>
      <p>כתובת: ${product.address}</p>
      <p>מייל: ${product.email}</p>
      <p>טלפון: ${product.phone}</p>
      <p>מס' כדורים: ${product.numPills}</p>
      <p>מחיר לכדור: ${product.pricePerPills}</p>
      </div>
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
  } catch (err) {
    console.error('Error:', err);
  }
});



module.exports = router;
