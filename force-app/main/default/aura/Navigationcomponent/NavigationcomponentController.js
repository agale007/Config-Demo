({
   /* callevent : function(component, event, helper) {
        var msg=component.get("v.eventmsg");
        component.set("v.demoevent",msg);
      
        component.set("v.iseventStyling",true);
        component.set("v.isHomeStyling",false);
        component.set("v.iswebinarStyling",false);
        component.set("v.issignOutStyling",false);
    },*/
    webinars : function(component, event, helper) {
       /* var msg=component.get("v.webinarmsg");
        component.set("v.demoevent",msg);
        component.set("v.iseventStyling",false);
        component.set("v.isHomeStyling",false);
        component.set("v.iswebinarStyling",true);
        component.set("v.issignOutStyling",false);*/
        
        component.set("v.isHomeCalling",false);
        component.set("v.isEventCalling",false);
        component.set("v.isWebinarCalling",true);
        
        

        
        
        
        
    },
    signout :  function(component, event, helper) {
        /*var msg=component.get("v.signoutmsg");
        component.set("v.demoevent",msg);
        component.set("v.iseventStyling",false);
        component.set("v.isHomeStyling",false);
        component.set("v.iswebinarStyling",false);
        component.set("v.issignOutStyling",true);*/
        
        component.set("v.isHomeCalling",false);
        component.set("v.isEventCalling",false);
        component.set("v.isWebinarCalling",false);

        
        
        
    },
    doInit : function(component, event, helper) {
        var msg=component.get("v.homemsg");
        component.set("v.demoevent",msg);
    },
    
   /* home : function(component, event, helper) {
        var msg=component.get("v.homemsg");
        component.set("v.demoevent",msg);
        var appEvent = $A.get("e.c:SFMC_HomePageCompSet");
        appEvent.setParams({
            "compset" : 'True'
        });
        appEvent.fire();
        component.set("v.iseventStyling",false);
        component.set("v.isHomeStyling",true);
        component.set("v.iswebinarStyling",false);
        component.set("v.issignOutStyling",false);
        
    }
    */
    home : function(component, event, helper) {
        var homeevent=component.get("v.isHomeCalling");
      
        component.set("v.isHomeCalling",true);
        component.set("v.isEventCalling",false);
        component.set("v.isWebinarCalling",false);
        
    },
    callevent : function(component, event, helper) {
        component.set("v.isHomeCalling",false);
        component.set("v.isEventCalling",true);
        component.set("v.isWebinarCalling",false);
         

        
    }
})