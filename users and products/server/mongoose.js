const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TodoApp-2');
mongoose.Promise = global.Promise;

module.exports = { mongoose }