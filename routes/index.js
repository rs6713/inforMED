var express = require('express');
var router = express.Router();






var users={};
users["becks_simpson"]={
  "password":"infusiondayhack",
  "job":"Prototype Developer",
  "condition": "Lymphoma",
  "appointments":[{"Date":"17-05-2018", "Type": "Diagnosis"},{"Date":"11-06-2018", "Type": "First Infusion"}],
  "hobbies": ["Coding", "Graphics", "Cats"],
  "symptoms":{"Pain":[4,3,7,8,5], "Vomiting":[0,0,3,2,1]}
};
//{"value": 3, "date": "12"},


/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index');
});

module.exports = router;
