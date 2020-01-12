const mysql = require('mysql');
const ejs = require('ejs');

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
    db.query(query,(err,result,fields) =>{
        if (err ) throw err;
    });
} 

 db.createUser =  (name,mail,password) =>{
    db.makeQuery(`CREATE TABLE IF NOT EXISTS tdlist.${name} (createdat DATETIME NOT NULL ,id INT(11) NOT NULL AUTO_INCREMENT , task VARCHAR(360),PRIMARY KEY(id))`);
    db.query(`INSERT INTO tdlist.user (email,passwordHash,username) values ('${mail}','${password}','${name}')`, (err,result,field) =>{
    if (err) throw err;
});
}

db.selectUser =  (mail) => {
     return db.query(`SELECT * FROM tdlist.user WHERE email = '${mail}'  `, (err,result,fields) =>{
        if (err ) throw err;
        return result[0];
    })      
}

module.exports = db;