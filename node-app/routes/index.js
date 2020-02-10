const express = require('express');
const  router = express.Router();
const bodyParser = require("body-parser");
const check = require("../handlers/inputsCheck")
const db = require("./database/database");
const User = require('../object/user');
const bcrypt = require('bcryptjs');
let mainPage = require('../handlers/mainPage');



let  urlencodedParser = bodyParser.urlencoded({extended : true});
 
router.get('/', async (req,res) => {
    await mainPage.render(req,res);
 });

router.post('/', urlencodedParser,(req,res)=>{
    mainPage.addTask(req,res);
});


 
router.get('/login', (req,res)=>{
    res.render('loginPage',  {pageName:'Log-in Page'})
});
router.get('/registration', (req,res)=>{
    res.render('signInPage',  {pageName:'Sign-in Page',
    Error:''
})
});

router.post('/registration', urlencodedParser,(req,res)=>{
     if (check.registrationDataCheck(req.body,res)) {
        let user = new User(req.body.mail,bcrypt.hashSync(req.body.passwordCr, 8),req.body.username)
            user.dbAddUser(user);
            res.redirect("/login");
    }
    else return res.end();
});

router.post('/login', urlencodedParser, async (req,res) => {
    if (check.loginDataCheck(req.body,res)) {
        let user = new User(req.body.mail,req.body.password)
          await user.auth(req,res);      
    }
    else return res.end();
})

router.get('/:user/:task' , (req,res) =>{
    db.makeQuery(`DELETE FROM ${req.params.user.toLowerCase()} WHERE task = "${req.params.task}"`)
    res.redirect('/');
})

 module.exports = router; 