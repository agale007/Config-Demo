({  
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
})