exports.render = (req,res) => {
    if(req.session.username){
    res.render('main',  {title:`${req.session.username}`,
    authorized:true,
})
    }
    if(!req.session.username){
    res.render('main',  {title:`Main Page`,
    authorized:false})
    }
}

exports.addTask = (req,res) => {
    db.makeQuery(`INSERT INTO tdlist.${req.session.username} (task) values ('${req.body.task}')`)
}