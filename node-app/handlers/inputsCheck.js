let ejs = require('ejs');


module.exports.registrationDataCheck = (body,res) => {
    if (!body.mail || !body.passwordCr || !body.passwordCf || !body.username) {
        res.render('signInPage', {title:'Sign-in Page',
        Error:"Register error: Not all fields are filled."     
    });
        return false;
    } 
    else if (body.passwordCr !== body.passwordCf) {
        res.render('signInPage', {title:'Sign-in Page',
        Error:"Register error: Passwords are different"
    });
        return false;
    } else   return true;
}
 module.exports.loginDataCheck = (body,res) =>{
     if (!body.mail || !body.password) {
         res.render('loginPage', {Error:"Login error: Not all fields are filled.",
         title:'Log-in Page'} 
         )};
         return res.end();

 }