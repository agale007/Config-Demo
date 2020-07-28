({
    getEventList: function(component) {
        var action = component.get("c.getAllActiveInactiveEvents");
        var status = $A.get("$Label.c.SFMC_Inactive_Status");
        action.setParams({
            isActive: status
        });
        var self = this;
        action.setCallback(this, function(actionResult) {
            var josnArr = this.formatEventsData(actionResult.getReturnValue());
            component.set("v.Events", josnArr);
         
        });
        $A.enqueueAction(action);
    },
    
    
    deleteEventSuccessToast : function(component, event, helper) {
        var deletesuccessLabel = $A.get("$Label.c.delete_event_and_campaign");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": deletesuccessLabel,
            "type":"success"
        });
        toastEvent.fire();
    },
    
    deleteEventErrorToast : function(component, event, helper) {
        var deleteErrorLabel = $A.get("$Label.c.SFMC_delete_event_and_campaign_error");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error!",
            "message": deleteErrorLabel,
            "type": "error"
        });
        toastEvent.fire();
    },
    
    formatEventsData : function(events) {
        
        var startdate  = new Date();
        var enddate  = new Date();
        var timezone = $A.get("$Locale.timezone");
        for(var i = 0;i < events.length;i++){
            startdate = new Date(events[i].Start_Date_Time__c).toLocaleString("en-US", {timeZone: timezone},{hour12:true})
            enddate = new Date(events[i].End_Date_Time__c).toLocaleString("en-US", {timeZone: timezone})
            startdate= $A.localizationService.formatDate(startdate, "yyyy-MM-dd  HH:mm:ss");
            enddate=$A.localizationService.formatDate(enddate, "yyyy-MM-dd  HH:mm:ss");
            events[i].Start_Date_Time__c=startdate;
            events[i].End_Date_Time__c =enddate;
        }
        return events;
    },
})