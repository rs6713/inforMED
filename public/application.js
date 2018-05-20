var mainApplicationModuleName= 'informed';
var mainApp= angular.module(mainApplicationModuleName, ['ui.bootstrap', 'ngMaterial', 'ngMessages', 'chart.js','angular-timeline']);

mainApp.factory('getUser', ['$http',  function($http){
    return $http.get("/getUser");  
}]);

//wss://lex-us-east-1.nexmo.com/bot/inforMED/alias/Informed/user/Becks/content


mainApp.controller('mainController',['$scope','$timeout', '$sce','$mdToast' , "$mdDialog",function($scope, $timeout,$sce, $mdToast, $mdDialog){

    $scope.colors=["#FF809B", "#7B9FAD", "#3EC6FA", "#DBDAC5", "#EDE88F"];
    $scope.chartcolors=["#FF809B", "#00dd00", "#3EC6FA", "#DBDAC5", "#EDE88F"];
    $scope.username="";
    $scope.password="";
    $scope.userquery="";
    $scope.conversation=[{type:"bot", text:$sce.trustAsHtml( "Hello, I am inforMED, here to help you to navigate your user journey. What can I help you with today?")}];
    $scope.userchart="symptoms";
    $scope.submitchat=function(){
        $scope.conversation.push({type:'user', text: $scope.userquery});
        $scope.userquery="";
    }

    var d = new Date();
    var now= d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    console.log(now);

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


    /* Dodgy chatbot section */
    //document.getElementById("wisdom").focus();
    
            // Initialize the Amazon Cognito credentials provider
            AWS.config.region = 'us-east-1'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            // Provide your Pool Id here
                IdentityPoolId: 'us-east-1:d598e55a-bc81-4c37-8390-5034f2d0089b',
            });
    
            var lexruntime = new AWS.LexRuntime();
            var lexUserId = 'chatbot-demo' + Date.now();
            var sessionAttributes = {};
    

            $scope.pushChatEnter=function(e){
                    console.log(e);
                    console.log("sippity sup")
                    if(e.which === 13) {
                        $scope.pushChat();
                    }
            }

            $scope.pushChat = function() {
    
                // if there is text to be sent...
                var wisdomText = $scope.userquery;
                if (wisdomText  && wisdomText.trim().length > 0) {
    
                    // disable input to show we're sending it
                    var wisdom = wisdomText;
                    //wisdomText.value = '...';
                    //wisdomText.locked = true;
                    console.log(wisdom)
                    // send it to the Lex runtime
                    var params = {
                        botAlias: '$LATEST',
                        botName: 'inforMED',
                        inputText: wisdom,
                        userId: lexUserId,
                        sessionAttributes: sessionAttributes
                    };
                    $scope.showRequest(wisdom);
                    lexruntime.postText(params, function(err, data) {
                        console.log("Error", err)
                        console.log("Data", data)
                        $scope.userquery = '';
                        if (err) {
                            console.log(err, err.stack);
                            showError('Error:  ' + err.message + ' (see console for details)')
                        }
                        if (data) {
                            // capture the sessionAttributes for the next cycle
                            sessionAttributes = data.sessionAttributes;
                            // show response and/or error/dialog status
                            $scope.showResponse(data);
                        }
                        // re-enable input
                        
                        //wisdomText.locked = false;
                    });
                }
                // we always cancel form submission
                return false;
            }
    
            $scope.showRequest= function(daText) {
                $scope.conversation.push({type:'user', text: $sce.trustAsHtml(daText)});
                if(daText.indexOf("nausea")!=-1){
                    $scope.currentuser.symptoms.Vomiting.push(1);
                    $scope.currentuser.symptoms.Dates.push(now);
                }
                
                return

                /*
                var conversationDiv = document.getElementById('conversation');
                var requestPara = document.createElement("P");
                requestPara.className = 'userRequest';
                requestPara.appendChild(document.createTextNode(daText));
                conversationDiv.appendChild(requestPara);
                conversationDiv.scrollTop = conversationDiv.scrollHeight;
                */
            }
            
            function showError(daText) {
    /*
                var conversationDiv = document.getElementById('conversation');
                var errorPara = document.createElement("P");
                errorPara.className = 'lexError';
                errorPara.appendChild(document.createTextNode(daText));
                conversationDiv.appendChild(errorPara);
                conversationDiv.scrollTop = conversationDiv.scrollHeight;
                */
            }
    
            $scope.showResponse= function(lexResponse) {
    
                //var conversationDiv = document.getElementById('conversation');
                //var responsePara = document.createElement("P");
                //responsePara.className = 'lexResponse';
                console.log(lexResponse)
                if (lexResponse.message) {
                    //responsePara.appendChild(document.createTextNode(lexResponse.message));
                    //responsePara.appendChild(document.createElement('br'));
                    //$scope.conversation.push({type:'bot', text: lexResponse.message});
                }
                if (lexResponse.dialogState === 'ReadyForFulfillment') {
                    $scope.conversation.push({type:'bot', text: $sce.trustAsHtml("Ready for fulfillment")});
                    $scope.$apply();
                    //responsePara.appendChild(document.createTextNode('Ready for fulfillment'));
                    // TODO:  show slot values
                } 
                if(lexResponse.responseCard) { 

                    
                        var response=lexResponse.responseCard.genericAttachments[0];
                        //console.log("hello",lexResponse.responseCard, lexResponse.responseCard.genericAttachments[0].buttons)
                        var crafted="";
                        for(var i=0; i<response.buttons.length;i++){
                            crafted=crafted+ response.buttons[i].text+", ";
                        }
                        console.log(crafted)
                        console.log($scope.conversation)
                        $scope.conversation.push({type:'bot', text: $sce.trustAsHtml(response.title +": ")});
                        $scope.$apply();
                        $scope.conversation.push({type:'bot', text: $sce.trustAsHtml(crafted)});
                        $scope.$apply();
                }else if(lexResponse.message[0]=="{"){
                    //multiple messages
                    var response= JSON.parse(lexResponse.message);
                    for(var i=0; i<response.messages.length;i++){
                        var responseI=response.messages[i].value;
                        if(response.messages[i].value.indexOf("https://")!=-1  || response.messages[i].value.indexOf("www.")!=-1 ){
                            responseI="<a href='"+response.messages[i].value+"'>"+response.messages[i].value.replace('https://','').replace('www.','')+"</a>"
                        }
                        $scope.conversation.push({type:'bot', text: $sce.trustAsHtml(responseI )});
                        
                    }
                    $scope.$apply();
                    
                    //$scope.conversation.push({type:'bot', text: lexResponse.dialogState});
                    //responsePara.appendChild(document.createTextNode('(' + lexResponse.dialogState + ')'));
                }else{
                    $scope.conversation.push({type:'bot', text: $sce.trustAsHtml(lexResponse.message)});
                    $scope.$apply();

                }
                return
                //conversationDiv.appendChild(responsePara);
                //conversationDiv.scrollTop = conversationDiv.scrollHeight;
            }










}]);