const mysql = require('mysql');
const ejs = require('ejs');
let Promise = require('promise');

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'changeapassword12',
    database: 'tdlist'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

db.makeQuery = (query) => {
    db.query(query,(err,result,fields) => {
        if (err) throw err;
    });
} 

 db.createUser =  (name,mail,password) =>{
    db.makeQuery(`CREATE TABLE IF NOT EXISTS tdlist.${name}
     (createdat DATETIME NOT NULL  DEFAULT CURRENT_TIMESTAMP ,id INT(11) NOT NULL AUTO_INCREMENT , task VARCHAR(360),PRIMARY KEY(id))`);
    db.makeQuery(`INSERT INTO tdlist.user (email,passwordHash,username) values ('${mail}','${password}','${name}')`);
}

db.selectUser = async (mail) => {
    let myResult = new Promise((resolve,reject) =>{
        db.query(`SELECT * FROM tdlist.user WHERE email = '${mail}'  `, (err,result,fields) =>{
          resolve(result)            
         })
    })
   return myResult.then((result) =>{
        return result[0];
    })     
}

module.exports = db;

