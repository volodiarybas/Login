const db = require("../routes/database/database");

function User (email,password,name) {
        this.name = name;
        this.mail = email;
        this.password = password;
        this.dbAddUser = () => {
            db.createUser(this.name,this.mail,this.password);
        }
    }    
    

 module.exports = User;