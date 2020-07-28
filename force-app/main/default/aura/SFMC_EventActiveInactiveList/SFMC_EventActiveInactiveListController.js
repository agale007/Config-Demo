({
    doInit : function(component, event, helper) {
        
    },
    
    goToRegistrantsPage: function(component, event, helper) {
        var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
        var EventCampId = event.target.getElementsByClassName("Event-WhatId")[0].value;
        var EventcampName = event.target.getElementsByClassName("Event-CampName")[0].value;
        var active = component.get("v.isActive");
        component.set("v.Eventid", EventId);
        component.set("v.campid", EventCampId);
        component.set("v.campName", EventcampName);
        component.set("v.displayedSection","");
        component.set("v.isRegisterants",true);
        var cmpEvent = component.getEvent("HideACtiveEvent");
        cmpEvent.setParams({
            "Hideevent" : "",
            "isRegistered":true,
            "displayedbuttonandstatus":active,
            "campid":EventCampId,
            "campName":EventcampName,
            "Eventid":EventId
            
        });
        cmpEvent.fire();
        
    },
    
    edit : function(component, event, helper) {
        var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
        var EventCampId = event.target.getElementsByClassName("Event-WhatId")[0].value;
        component.set("v.Eventid", EventId);
        component.set("v.campid", EventCampId);
        component.set("v.isClone", false);
        component.set("v.isEdit",true);
    },
    
    clone : function(component, event, helper) {
        var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
        var EventCampId = event.target.getElementsByClassName("Event-WhatId")[0].value;
        component.set("v.Eventid", EventId);
        component.set("v.campid", EventCampId);
        component.set("v.isClone", true);
        component.set("v.isEdit",true);
    },
    
    
    handleComponentEvent : function(component,event,helper)
    {
        var params = event.getParams();
        if(params.context=='Hide_Edit_Modal')
            component.set("v.isEdit",params.showModal);
    }, 
    
    handleDeleteEvent : function(component,event,helper)
    {
        
        var params = event.getParams();
        if(params.context=='Hide_Edit_Modal')
            component.set("v.isDelete",params.showModal);
    },
    
    deleteEvent: function(component, event, helper) {
        
        var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
        var EventCampId = event.target.getElementsByClassName("Event-WhatId")[0].value;
        component.set("v.Eventid", EventId);
        component.set("v.campid", EventCampId);
        component.set("v.isDelete", true);
    },
    
    
    
    
})