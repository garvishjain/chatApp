// const { writeLog } = require("../apps/helpers/utils");
// const axios  = require("axios");
const postgreConnection = require("../apps/helpers/sequelizeHelpers");
const {registeruser} = require('../database/model');
const bcrypt = require('bcrypt');

module.exports = class ChatboatServices {
  static async userRegister(objUser) {
    try {
      console.log(objUser,"objUser>>>>");
      let squery = `select * from registrationusers where userName = ${objUser.userName} and email = ${objUser.email}`
      let existuser  = await postgreConnection.query(squery)
      console.log(existuser,"existuser>>>>>");
      if(!existuser){
        console.log("User is already Exist"); 
      }
      
    } catch (error) {
        
    }
  }
}