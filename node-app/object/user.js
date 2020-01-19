const db = require("../routes/database/database");
const bcrypt = require('bcryptjs');


class User  {
        constructor (email,password,name) {
            this.name = name;
            this.mail = email;
            this.password = bcrypt.hashSync(password, 8);
        }
        dbAddUser() {
            db.createUser(this.name,this.mail,this.password);
        }
          auth() {
          
            
        }
    }    
    

 module.exports = User;