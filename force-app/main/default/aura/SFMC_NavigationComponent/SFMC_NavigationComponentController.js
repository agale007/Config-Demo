({
   
    doInit : function(component, event, helper) {
        helper.getusername(component, event, helper);
        
    },
    
    //----------------------------------------------//
    webinars : function(component, event, helper) {
        component.set("v.isWebinarCalling",false);
        component.set("v.isHomeCalling",false);
        component.set("v.isEventCalling",false);
        component.set("v.isWebinarCalling",true);
    },
    
    //--------------------------------------------//
    signout :  function(component, event, helper) {
        component.set("v.isHomeCalling",false);
        component.set("v.isEventCalling",false);
        component.set("v.isWebinarCalling",false);
        var urlString = window.location.href;
        var baseURL = urlString.substring(0, urlString.indexOf("/s"));        
        window.location.replace(baseURL + "/secur/logout.jsp?startURL=/s");
    },
    
    //--------------------------------------------//
    home : function(component, event, helper) {
        var homeevent=component.get("v.isHomeCalling");
        component.set("v.isHomeCalling",true);
        component.set("v.isEventCalling",false);
        component.set("v.isWebinarCalling",false);
    },
    
    //--------------------------------------------//
     callevent : function(component, event, helper) {
        component.set("v.isEventCalling",false);
        component.set("v.isHomeCalling",false);
        component.set("v.isWebinarCalling",false);
        component.set("v.isEventCalling",true);
        component.set("v.navigationStatus",true);
         },
    
    handleEditEvent: function(component, event, helper) {
        component.set("v.isEventCalling",false);
        component.set("v.isHomeCalling",false);
        component.set("v.isWebinarCalling",false);
        component.set("v.isEventCalling",true);
        component.set("v.navigationStatus",true);
         },
    handleDeleteEvent: function(component, event, helper) {
        component.set("v.isEventCalling",false);
        component.set("v.isHomeCalling",false);
        component.set("v.isWebinarCalling",false);
        component.set("v.isEventCalling",true);
        component.set("v.navigationStatus",true);
        
    }
    
})