const db = require("../routes/database/database");
const bcrypt = require('bcryptjs');


class User  {
        constructor (email,password,name) {
            this.name = name;
            this.mail = email;
            this.password = password;
        }
        dbAddUser() {
            db.createUser(this.name,this.mail,this.password);
        }
       
       
        async auth(req,res) {        
        let dbResult = await db.selectUser(this.mail)
        .then((dbResult) =>{
            return bcrypt.compare(this.password,dbResult.passwordHash).then((result) => {
                if (result) {
                    req.session.username = dbResult.username;
                    res.redirect('/')
                }
            })
        })
        }
    }    
    

 module.exports = User;