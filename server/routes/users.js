var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const authenticate = require('../middleware/authenticate');


//פונקציה ששולחת את שם המשתמש
router.get('/', authenticate, async function (req, res) {
  try {
    const userId = req.user.userId;
    // console.log(userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.send(user);

  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// פונקציה שמחזירה את כל המוצרים שהמשתמש פרסם
router.get('/products', authenticate, async function (req, res) {
  try {
    const userId = req.user.userId;

    const products = await Product.find({ addedBy: userId });

    res.json(products);

  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// פונקציה שמוסיפה מודעה שמשתמש לייק לרשימת הלייקים שלו
router.post('/like/:productId', authenticate, async function (req, res) {
  try {
    const productId = req.params.productId;
    const userId = req.user.userId;
    // console.log(userId);
    const user = await User.findById(userId);
    // console.log('User:', user);
    if (user.likedPosts.includes(productId)) {
      // המשתמש כבר לייק את המוצר, כאן אפשר להחזיר הודעה או לעשות פעולה אחרת
      return 'User already liked this product';
    }
    user.likedPosts.push(productId);
    await user.save();

    // res.json( );


  } catch (error) {
    console.error('Error handling like:', error);
    res.status(500).send('Server Error');
  }
});

//פונקציה שמחזירה את כל המודעות שהמשתמש לייק
router.get('/likes', authenticate, async function (req, res) {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    const likedPosts = await Product.find({
      _id: { $in: user.likedPosts }
    });

    res.json(likedPosts);

  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// פונקציה שמוחקת מודעה מרשימת הלייקים
router.delete('/:id',authenticate, async function (req, res) {
  const userId = req.user.userId;
  const likeIdToRemove = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // נמצא את האינדקס של הלייק שאנו רוצים למחוק
    const indexToRemove = user.likedPosts.indexOf(likeIdToRemove);

    // אם הלייק נמצא, מחק אותו מהמערך
    if (indexToRemove !== -1) {
      user.likedPosts.splice(indexToRemove, 1);
    } else {
      return res.status(404).json({ error: 'Like not found.' });
    }

    // שמור את השינויים במסד הנתונים
    await user.save();

    res.json({ success: true});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
