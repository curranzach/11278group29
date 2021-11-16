const { db, admin } = require('../util/admin');

exports.getDemo = (req, res) => {
    res.send("Hello World!");
 };

 exports.postDemo = (req, res) => {
     const user = {
         email: req.body.email,
         password: req.body.password
     }
     return res.json(user);
 };