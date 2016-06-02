var express = require('express');
var router = express.Router();
var orgRelService=require('./routes/index');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/managerDetails/:empId')
.get(function(req,res,next){
     orgRelService.getAll(function(err,result){
       if(err) res.send(err);
       console.log('Inside Get Promise');
       console.log(result);
       res.json(result);
     });
  });

  router.route('/TeamDetails/:ProjectTitle')
  .get(function(req,res,next){
       orgRelService.getAll(function(err,result){
         if(err) res.send(err);
         console.log('Inside Get Promise');
         console.log(result);
         res.json(result);
       });
    });

    router.route('/AlternativeManager/:ManagerID')
    .get(function(req,res,next){
         orgRelService.getAll(function(err,result){
           if(err) res.send(err);
           console.log('Inside Get Promise');
           console.log(result);
           res.json(result);
         });
      });

      router.route('/empName/:empID')
      .get(function(req,res,next){
           orgRelService.getAll(function(err,result){
             if(err) res.send(err);
             console.log('Inside Get Promise');
             console.log(result);
             res.json(result);
           });
        });

      router.route('/EmpHiearchy/:EmpID/ManagerID/ManagermanagerID')
      .get(function(req,res,next){
           orgRelService.getAll(function(err,result){
             if(err) res.send(err);
             console.log('Inside Get Promise');
             console.log(result);
             res.json(result);
           });
        });
module.exports = router;
