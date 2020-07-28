({
    cancel: function(component, event, helper) {
        var cmpEvent = component.getEvent("deleteEvent");
        cmpEvent.setParams({
            "showModal" : false,
            "context" : "Hide_Edit_Modal"
        });
        cmpEvent.fire();
    },
    
    deleteEventRec: function(component, event, helper) {
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
                var cmpEvent = component.getEvent("deleteEvent");
                cmpEvent.setParams({
                    "showModal" : false,
                    "context" : "Hide_Edit_Modal"
                });
                cmpEvent.fire();
                component.set("v.closemodal",false); 
            } else 
            {
                helper.deleteEventErrorToast(component,event,helper);
                var cmpEvent = component.getEvent("deleteEvent");
                cmpEvent.setParams({
                    "showModal" : false,
                    "context" : "Hide_Edit_Modal"
                });
                cmpEvent.fire();
                component.set("v.closemodal",false); 
                
            }
        });
        $A.enqueueAction(action);
        
        
    },
})