var express = require('express');
var router = express.Router();
const Product = require('../models/product');
const authenticate = require('../middleware/authenticate');
// const { isAdminPassword } = require('../middleware/adminUtils');



router.get('/', async function (req, res, next) {
  const city = req.query.city;
  const price = req.query.category;
  const page = req.query.page || 1; // משתנה לקבלת מספר העמוד

  try {
    let query = {};

    if (city && price) {
      priceRange = convertPriceRangeToNumber(price);
      query = { city: city, pricePerPills: { $lte: priceRange } };
      // console.log(query);
    } else if (city) {
      query = { city: city };
    } else if (price) {
      priceRange = convertPriceRangeToNumber(price);
      query = { pricePerPills: { $lte: priceRange } };
    }

    const itemsPerPage = 6; // מספר הפריטים שיוצג בכל עמוד
    const skip = (page - 1) * itemsPerPage;

    const products = await Product.find(query)
      .skip(skip)
      .limit(itemsPerPage);

    const totalItems = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    res.send({ items: products, totalPages });
  } catch (err) {
    console.log(err);
  }
});


function convertPriceRangeToNumber(priceRange) {
  switch (priceRange) {
    case 'עד 5 שקל':
      return 5;
    case 'עד 10 שקל':
      return 10;
    default:
      return 0;
  }
}



router.post('/', authenticate, async function (req, res) {
  const product = new Product({
    name: req.body.name,
    city: req.body.city,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    numPills: req.body.numPills,
    pricePerPills: req.body.pricePerPills,
    remarks: req.body.remarks,
    addedBy: req.user.userId
  });


  try {
    await product.save();
    // console.log('המודעה נוספה בהצלחה');
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//מחיקת מודעה
router.delete('/:id', authenticate, async function (req, res) {
  const productId = req.params.id;

  // const userId = req.user.userId;
  // const isAdmin = await isAdminPassword(userId);

  // if(isAdmin)

  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    await Product.deleteOne({ _id: productId });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// קבלת מודעה לפי מזהה
router.get('/:id', authenticate, async function (req, res) {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.send(product);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// עדכון מודעה
router.put('/:id', authenticate, async function (req, res, next) {
  const productId = req.params.id;
  const updatedData = req.body;
  console.log(updatedData);

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: updatedData },
      { new: true } // החזר את המוצר המעודכן
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(updatedProduct);



  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;