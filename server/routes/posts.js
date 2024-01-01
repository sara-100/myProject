var express = require('express');
var router = express.Router();
const Post = require('../models/post');

// קבלת כל המודעות
// router.get('/', async function (req, res, next) {
//   try {
//     const posts = await Post.find({});
//     res.send(posts);

//   } catch (err) {
//     console.log(err);
//   }
// });

// קבלת מודעות לפי קטגוריה אחת
// router.get('/', async function (req, res, next) {
//   const category = req.query.category;
//   const area = req.query.area;
//   try {
//     let posts;
//     if (category) {
//       posts = await Post.find({ category: { $in: [category] } });
//     } else {
//       posts = await Post.find({});
//       // console.log(posts);
//     }
//     res.send(posts);

//   } catch (err) {
//     console.log(err);
//   }
// });

//קבלת מודעה לפי 2 קטגוריות
// router.get('/', async function (req, res, next) {
//   const category = req.query.category;
//   const city = req.query.city;
//   const page = req.query.page || 1;
//   const itemsPerPage = 8; // מספר הפריטים שיוצג בכל עמוד
//   const skip = (page - 1) * itemsPerPage;

//   try {
//     let posts;
//     if (category && city) {
//       posts = await Post.find({ products: { $in: [category] } , city : city }).skip(skip).limit(itemsPerPage);  
//     } else if (!category && !city) {
//       posts = await Post.find({}).skip(skip).limit(itemsPerPage);
//     } else if (category) {
//       posts = await Post.find({products: { $in: [category] }}).skip(skip).limit(itemsPerPage);
//     } else if (city) {
//       posts = await Post.find({city : city}).skip(skip).limit(itemsPerPage);
//     }

//     const totalItems = await Post.countDocuments();
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     res.send({ items: posts, totalPages });
    

//   } catch (err) {
//     console.log(err);
//   }
// });

//קבלת מודעה לפי 2 קטגוריות
router.get('/', async function (req, res, next) {
  const city = req.query.city;
  const category = req.query.category;
  const page = req.query.page || 1; // משתנה לקבלת מספר העמוד

  try {
    let query = {};

    if (city && category) {
      query = { city: city, products: { $in: [category] } };
    } else if (city) {
      query = { city: city };
    } else if (category) {
      query = { products: { $in: [category] } };
    }

    const itemsPerPage = 6; // מספר הפריטים שיוצג בכל עמוד
    const skip = (page - 1) * itemsPerPage;

    const posts = await Post.find(query)
      .skip(skip)
      .limit(itemsPerPage);

    const totalItems = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    res.send({ items: posts, totalPages });
  } catch (err) {
    console.log(err);
  }
});






// הוספת מודעה חדשה
router.post('/new', async function (req, res, next) {
  const post = new Post(req.body);
  try {
    await post.save();
    // console.log('המודעה נוספה בהצלחה');
  } catch (err) {
    console.log(err);
  }
})





module.exports = router;