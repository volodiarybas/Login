exports.render = async (req,res) => {
    if(req.session.username){
    db.query(`SELECT * FROM tdlist.${req.session.username} `, (err,result,fields) =>{
        res.render('main',  {pageName:`${req.session.username}`,
            authorized:true, tasks:result})
    });  
    
    }
    if(!req.session.username){
    res.render('main',  {pageName:`Main Page`,
    authorized:false, tasks:false})
    }
}

exports.addTask = (req,res) => {
    db.makeQuery(`INSERT INTO tdlist.${req.session.username} (task) values ('${req.body.task}')`)
    res.end();
}