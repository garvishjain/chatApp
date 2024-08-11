const { chatboat } = require('../controller/chatboatcontroller');

const Routes = require('express').Router();

Routes.route("/").get(chatboat);

module.exports= Routes;