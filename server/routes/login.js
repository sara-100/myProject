var express = require('express');
var router = express.Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.post('/', async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      const token = jwt.sign({ userId: user._id }, 'your-secret-key');
      res.json({ success: true, token });
    } else {
      // הוספת בדיקה נוספת להצגת הודעה במקרה של אחד מהפרטים שגוי
      const userWithEmail = await User.findOne({ email });

      if (userWithEmail) {
        res.json({ error: 'סיסמה שגויה' }).status(401);
      } else {
        res.json({ error: 'לפחות אחד מהנתונים שהזנת שגוי' }).status(401);
      }
    }
  } catch (err) {
    res.status(500).json({  error: 'Internal server error' });
  }
});


router.post('/new', async function (req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    console.log('המשתמש נוסף בהצלחה');
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;