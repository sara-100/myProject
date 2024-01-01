var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var productsRouter = require('./routes/products');
var loginRouter = require('./routes/login');
var emailRoutes = require('./routes/send-email');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myProject');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/products', productsRouter);
app.use('/login', loginRouter);
app.use('/send-email', emailRoutes);

module.exports = app;
