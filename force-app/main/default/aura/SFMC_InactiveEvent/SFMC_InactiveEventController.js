({
    doInit: function(component, event, helper){
        helper.getEventList(component);
    },
    //------------------------------------------//
    deleteEvent: function(component, event, helper) {
        var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
        var EventwhatId = event.target.getElementsByClassName("Event-WhatId")[0].value;
        component.set("v.Eventid", EventId);
        component.set("v.campid", EventwhatId);
        component.set("v.isDelete",true);
    },
    
    //---------------------------------------//
    Delete: function(component, event, helper) {
        var eventIds = component.get("v.Eventid");
        var action = component.get("c.deleteevent");
        action.setParams({
            evtid: eventIds
            });
        action.setCallback(this, function(a) {
            var state = a.getReturnValue();
            if (state) {
                var name = a.getReturnValue();
                helper.deleteEventSuccessToast(component,event,helper);
                component.set("v.isDelete", false);
            } else {
                
                helper.deleteEventErrorToast(component,event,helper);
                component.set("v.isDelete", false);
            }
        });
        $A.enqueueAction(action);
        component.updateEventList();
        
    },
    
    //---------------------------------------------------------------------------------------------//
    cancel: function(cmp, evt, helper) {
        cmp.set("v.isDelete", false);
        
    },
    
    //--------------------------------------------------------------------------------------------//
    edit : function(component, event, helper) {
        var recordId = event.getSource().get("v.value");
        component.set("v.Eventid", recordId);
        component.set("v.isClone", false);
        component.set("v.isEdit",true);
    },
    //-------------------------------------------------------------------------------------------//
     clone : function(component, event, helper) {
        var recordId = event.getSource().get("v.value");
         console.log('id>',recordId);
        component.set("v.Eventid", recordId);
        component.set("v.isClone", true);
        component.set("v.isEdit",true);
    },
    
    //---------------------------------//
    handleComponentEvent : function(component,event,helper)
    {
        var params = event.getParams();
        if(params.context=='Hide_Edit_Modal')
        component.set("v.isEdit",params.showModal);
    },
    //-------------------------------------------------------------------------------------------//
    gotoregistrants: function(component, event, helper) {
        
        var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
        var EventwhatId = event.target.getElementsByClassName("Event-WhatId")[0].value;
        var EventcampName = event.target.getElementsByClassName("Event-CampName")[0].value;
        component.set("v.Eventid", EventId);
        component.set("v.campid", EventwhatId);
        component.set("v.campName", EventcampName);
        component.set("v.isRegisterants",true);
        component.set("v.displayedSection"," ");
        var cmpEvent = component.getEvent("HideACtiveEvent");
        cmpEvent.setParams({
            "Hideevent" : ""
        });
        cmpEvent.fire();
        },


})