"use strict";

const ChatboatService = require("../services/ChatboatServices");

// const {
//   successResponse,
//   errorResponse,
//   successWithoutDataResponse,
// } = require("../apps/helpers/customResponseTemplate");

module.exports = class ChatboatController extends ChatboatService {
    constructor() {
      super();
    }

    static async register(req,res){
        try {
            let obj = req.body;
            let result = await super.userRegister(obj);
            // console.log(result,"result");
            
            // if (result.GetStatus){                  
            //     return successResponse(req, res, "successfully sent OTP", result.GetMessage);
            // }
            // else
            // return successWithoutDataResponse(req, res, "No record found.",result.GetMessage);
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    static async chatboat(req,res){
        return res.render('index.hbs')
    }
}
