const express = require('express');
const  router = express.Router();
const bodyParser = require("body-parser");
const check = require("../handlers/inputsCheck")
const db = require("./database/database");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('../object/user')

router.use


let  urlencodedParser = bodyParser.urlencoded({extended : true});
 
router.get('/', (req,res)=>{
     res.render('main',  {title:'Main Page'})
 });
router.get('/login', (req,res)=>{
    res.render('loginPage',  {title:'Log-in Page'})
});
router.get('/registration', (req,res)=>{
    res.render('signInPage',  {title:'Sign-in Page',
    Error:''
})
});

router.post('/registration', urlencodedParser,  (req,res)=>{
     if (check.registrationDataCheck(req.body,res)) {
        let password = bcrypt.hashSync(req.body.passwordCr, 8);
        let user = new User(req.body.mail,password,req.body.username)
        user.dbAddUser(user);
        res.redirect("/login");
    }
    else return res.end();
});

router.post('/login', urlencodedParser, (req,res) => {
    check.loginDataCheck(req.body,res); 
    let user = new User(req.body.mail,password)
})

 module.exports = router;