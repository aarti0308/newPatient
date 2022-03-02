 // import { use } from "express/lib/application";
 import userService from "../services/userService";
 import {validationResult} from "express-validator";

 let getHomepage = (req, res) => {
     return res.render("homepage.ejs");
 };

 let getNewUserPage = (req, res) => {
     return res.render("createUser.ejs");
 };
 let createNewUser = async (req, res) => {
     let user = req.body;
     await userService.createNewUser(user);
     // await userService.createNewUser(user);
     return res.redirect("/");
 }

 let getLoginPage = (req, res) => {
     // return res.render("auth/login.ejs",{
     //     errors: req.flash("errors")
     // });
     return res.render("auth/login.ejs");
 };

 let getRegisterPage = (req, res) => {
     let form = {
         firstName: req.body.firstName,
         lastName: req.body. lastName,
         email: req.body.email,
     };
     return res.render("auth/register.ejs" ,{
        errors: req.flash("errors"),
         form: form
     });
 };

let handleRegister = async (req, res) => {
    //keep the old input value
    let form = {
        firstName: req.body.firstName,
        lastName: req.body. lastName,
        email: req.body.email,
    };
    // validate input fields
    // create an empty array to save validation errors
    let errorsArr = [];
    let validationError =  validationResult(req);
    if(!validationError.isEmpty()){
        let errors = Object.values(validationError.mapped());
        errors.forEach((item)=>{
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.render("auth/register.ejs" ,{
            errors: req.flash("errors"),
            form: form
        });
    }
    try {
        let user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            createdAt: Date.now()
        };
        await userService.createNewUser(user);
        return res.redirect("/");
    }
    catch (err) {
        // showing the errors message with Flash
        req.flash("errors", err);
        return res.render("auth/register.ejs", {
            errors: req.flash("errors"),
            form: form
        });
    }
}

module.exports = {
    getHomepage: getHomepage,
    getNewUserPage: getNewUserPage,
    createNewUser: createNewUser,
    getRegisterPage: getRegisterPage,
    getLoginPage: getLoginPage,
    handleRegister: handleRegister
};



