var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Q=require('q');
var OrganizationrelationSchema =mongoose.Schema({
  Name:String,
  ID:Number,
  Role:String,
  Manager:{Name:String,ID:Number,Manager:String},
  Project:{ProjectName:String,Count:Number,
  project_Team:{  ID:Number}}
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var organisationRelationModel=mongoose.model('organisationRelationModel',OrganizationrelationSchema,'Employee_details');
var orgRelService={};

orgRelService.getAll=function(callback){
  //  var deferred=Q.defer();
  return organisationRelationModel.find({},callback);
};

function findMgrDetailsByEmpID( empID ){
  var deferred=Q.defer();
  console.log('inside get model');
  console.log(empID);
  organisationRelationModel.find({ID:empID})
                 .exec(function(err,data){
                   console.log(err);
                   managerObject=new managerObject();
                    managerObject.manager_name=data.Manager.Name;
                    managerObject.manager_id=data.Manager.ID;
                   console.log(OrganisationrelationObject.Manager);
                   deferred.resolve(managerObject);
                 });
         return deferred.promise;
}

// function findMgrDetailsByMgrID( mgrID ){
//   var deferred=Q.defer();
//   console.log('inside get model');
//   console.log(mgrID);
//   organisationRelationModel.find({ID:mgrID})
//                  .exec(function(err,data){
//                    console.log(err);
//                    OrganisationrelationObject=data.Manager;
//                    console.log(OrganisationrelationObject.Manager);
//                    deferred.resolve(OrganisationrelationObject);
//                  });
//          return deferred.promise;
// }

function findteamDetailsmgrDetailsByProjectName( ProjectTtile ){
  var deferred=Q.defer();
  console.log('inside get model');
  console.log(empID);
  organisationRelationModel.find({Name:ProjectTtile})
                 .exec(function(err,data){
                   if(err) console.log(err);
                   OrganisationrelationArray=data.project_TeamID;
                   employeeAndManagerArray=[];
                   for(var i=0;i<OrganisationrelationArray.length;i++){
                      id=OrganisationrelationArray[i];
                         orgRelService.findMgrDetailsByEmpID(id).then(function(err,managerObject){
                        if(err) console.log(err);

                        employeeAndManager=new employeeAndManager();
                        employeeAndManager.employee_id=id;
                        employeeAndManager.manager_id=managerObject.ID;
                        employeeAndManagerArray.push(employeeAndManager);
                      });
                   }
                   console.log(employeeAndManagerArray);
                   deferred.resolve(employeeAndManagerArray);
                 });
         return deferred.promise;
}
function findEmployeeName(empID){
    var deferred=Q.defer();
    organisationRelationModel.find({ID:empID})
                             .exec(function(err,employeeObject){
                              employee_name=employeeObject.Name;
                              deferred.resolve(employee_name);
                            });
                return deferred.promise;
}

function findAlternativeEmp(empID){
    var deferred=Q.defer();
    organisationRelationModel.find({ID:empID})
                             .exec(function(err,employeeObject){
                              Alternative_manager_array=employeeObject.Manager.Alternative_manager;
                              deferred.resolve(Alternative_manager_array);
                            });
                return deferred.promise;
}

function findEmpHiearchy(empID){
  var deferred=Q.defer();
   orgRelService.findEmployeeName(empID).then(function(err,employeeName){
      emp_name=employeeName;
   });
   orgRelService.findMgrDetailsByEmpID(empID).then(function(err,managerObject){
     if(err) console.log(err);
      orgRelService.findMgrDetailsByEmpID(managerObject.ID).then(function(err,ManagermanagerObject){
       hiearchyObject=new hiearchyObject();
       hiearchyObject.employee_id=empID;
       hiearchyObject.employee_name=emp_name;
       hiearchyObject.emp_managerId=managerObject.ID;
       hiearchyObject.emp_managerName=managerObject.Name;
       hiearchyObject.emp_manager_managerId=ManagermanagerObject.ID;
       hiearchyObject.emp_manager_managerName=ManagermanagerObject.Name;
         deferred.resolve(hiearchyObject);
            });
   });
   return  deferred.promise;
}
module.exports = router;
