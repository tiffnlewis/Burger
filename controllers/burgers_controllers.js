var express = require('express')
var burger = require('../models/burger.js')
var router = express.Router();
var rows;
//module.exports = function(app){
router.get('/', function(req, res){
    burger.selectAll(function(data){
        rows = data.length
        var hbsObject = {
            burgers: data
        }
        console.log(hbsObject)
        res.render("index", hbsObject)
    })
})

router.put('/api/burgers/:id', function(req, res){
    var condition = "id = " + req.params.id;
    burger.update({
        devoured: req.body.devoured
    }, condition, function(result){
        console.log(result)
       
          if(res.changedRows === 0){
               return res.sendStatus(404).end();
           }  else {
               res.sendStatus(200).end()
           }
        }
    )
})

router.post('/api/burgers/:name', function(req, res){
    var id = rows + 1;
    var name = req.params.name;
    var columns = ["id", "burger_name", "devoured"]
    var vals = [id, name, 0]
    burger.insert(columns, vals, function(result){
        console.log(res.json(result))
        res.end()
    })
})

//}
module.exports = router;