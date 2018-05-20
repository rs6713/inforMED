var mainApplicationModuleName= 'informed';
var mainApp= angular.module(mainApplicationModuleName, ['ui.bootstrap', 'ngMaterial', 'ngMessages', 'chart.js','angular-timeline']);

mainApp.factory('getUser', ['$http',  function($http){
    return $http.get("/getUser");  
}]);

//wss://lex-us-east-1.nexmo.com/bot/inforMED/alias/Informed/user/Becks/content


mainApp.controller('mainController',['$scope','$timeout','$mdToast' , "$mdDialog",function($scope, $timeout, $mdToast, $mdDialog){

    $scope.colors=["#FF809B", "#7B9FAD", "#3EC6FA", "#DBDAC5", "#EDE88F"];
    $scope.chartcolors=["#FF809B", "#00dd00", "#3EC6FA", "#DBDAC5", "#EDE88F"];
    $scope.username="";
    $scope.password="";
    $scope.userquery="";
    $scope.conversation=[{type:"bot", text:"Hello, I am informed, here to help you to navigate your user journey. What can I help you with today?"},{type:"bot", text:"It's okay to reply you're not sure..."}];
    $scope.userchart="symptoms";
    $scope.submitchat=function(){
        $scope.conversation.push({type:'user', text: $scope.userquery});
        $scope.userquery="";
    }

    $scope.currentuser=

    {
        "name":"Becks Simpson",
        "username":"becks_simpson",
        "number": "07804038740",
        "password":"infusiondayhack",
        "job":"Prototype Developer",
        "condition": "Lymphoma",
        "appointments":[{"Date":"17-05-2018", "Type": "Diagnosis", "Notes":""},{"Date":"11-06-2018", "Type": "First Infusion", "Notes":""}],
        "hobbies": ["Coding", "Graphics", "Piano"],
        "symptoms":{"Pain":[4,3,7,8,5], "Vomiting":[0,0,3,2,1], "Dates":["11-01-2018","14-02-2018","11-03-2018","11-05-2018","11-06-2018"]}
    };
    $scope.hello="heya";


    // in controller
    $scope.userAppointments = [];

    for(var i=0; i< $scope.currentuser.appointments.length; i++){
        $scope.userAppointments.push(
        {
            badgeClass: 'info',
            badgeIconClass: 'glyphicon-check',
            title: $scope.currentuser.appointments[i].Date+" : " + $scope.currentuser.appointments[i].Type,
            content: $scope.currentuser.appointments[i].Notes
        });
    }




    $scope.userLabels=[];
    $scope.userSymptoms=[];
    $scope.userSymptomsData=[];

    var i=0;
    for(var key in $scope.currentuser.symptoms){
        if(key!="Dates"){
            $scope.userSymptoms.push(key);
            $scope.userSymptomsData.push($scope.currentuser.symptoms[key]);  
        }else{
            $scope.userLabels=$scope.currentuser.symptoms[key];
        }
        i+=1
 
    }
    

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

}]);