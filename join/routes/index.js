
/*
 * GET home page.
 */

 var repo = require('../repository');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.form = function(req, res){
    res.render('join-form',{title:'Express'});
};

exports.join = function(req, res){
    //repo.insertUser(req.body,res);
    repo.hasNameAndEmail(req.body,res);
};