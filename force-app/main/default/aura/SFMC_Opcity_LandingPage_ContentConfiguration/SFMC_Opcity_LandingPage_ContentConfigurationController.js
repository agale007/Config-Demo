({
    doInit: function(component, event, helper) {
        
        //setSubmissionType = getSubmissionType;

        // Prepare a new record from template
        var appEvent = $A.get("e.c:SFMC_Opcity_LandingPage_ContentLayoutEvent"); 
        //Set event attribute value
        appEvent.setParams({"count" : component.get('v.count')});
        appEvent.fire();
    },
})