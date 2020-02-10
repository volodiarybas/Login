const express = require('express');
const app = express();
const router = require('./node-app/routes');
const session = require('express-session');

/*-------------------------------------*/
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'secret',saveUninitialized: true,resave: false}));


/*-------------------------------------*/
app.use('/', router)





app.listen('3000');