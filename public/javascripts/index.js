
$(document).ready(function(){


    $("#graph-menu").click(function(){
        
        $("#graph-menu").css("background-color","#3EC6FA")
        $("#microphone-menu").css("background-color","#007EAD")
        $("#user-menu").css("background-color","#007EAD")
        $("#user-profile").css("display", "none")
        $("#user-activity").css("display", "block")
        $("#main-chat").css("display", "none")
    });
    $("#microphone-menu").click(function(){
        $("#graph-menu").css("background-color","#007EAD")
        $("#microphone-menu").css("background-color","#3EC6FA")
        $("#user-menu").css("background-color","#007EAD")
        $("#user-profile").css("display", "none")
        $("#user-activity").css("display", "none")
        $("#main-chat").css("display", "flex")
    });
    $("#user-menu").click(function(){
        $("#graph-menu").css("background-color","#007EAD")
        $("#microphone-menu").css("background-color","#007EAD")
        $("#user-menu").css("background-color","#3EC6FA")
        $("#user-profile").css("display", "block")
        $("#user-activity").css("display", "none")
        $("#main-chat").css("display", "none")
    });

    $("#appointmentchart").click(function(){
        $("#appointmentchart").css("color","#222222");
        $("#symptomchart").css("color","#aaaaaa");
    });

    $("#symptomchart").click(function(){
        $("#symptomchart").css("color","#222222");
        $("#appointmentchart").css("color","#aaaaaa");
    });
})