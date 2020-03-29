require('../models/User');

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise; // uses NodeJS global promises
mongoose.connect(keys.mongoURI, { useMongoClient: true });

class CustomPage {
  constructor(page){
    this.page = page;
  }

  login() {
    this.page.goto('localhost:3000');
    this.page.setCookie();
  }
}