({
	getRecordDetails : function(component,event,helper) {
		component.set('v.showSpinner',true);
        
        var recordid = component.get('v.recordId');
        console.log('recordId>>',recordid);
        var action = component.get("c.getRelatedRecord");
        action.setParams({
            "recordId" : recordid
        });
        action.setCallback(this,function(response){
            var state = action.getState();
            if(state==='SUCCESS')
            {
                var actionResponse = JSON.parse(response.getReturnValue());
                component.set('v.webinarRecord',actionResponse.eventAndWebinarRecord);
                var selectedstatus = component.get('v.webinarRecord').Status__c;
                var selectedPublic = component.get('v.webinarRecord').Public__c;
                console.log('selectedstatus>>',selectedstatus);
                console.log('selectedPublic>>',selectedPublic);
                component.set('v.statusPicklistLst',actionResponse.statusPicklistLst);
                component.set('v.publicPicklistLst',actionResponse.publicPicklistLst);
                component.set('v.selectedWebinarStatus',selectedstatus);
                component.set('v.selectedIsPublic',selectedPublic);
                component.set("v.showModal",true);
                component.set('v.showSpinner',false);
            }
            else if(state==='ERROR')
            {
                component.set('v.showSpinner',false);
            }
        });
            $A.enqueueAction(action);
	},
    fireComponentEvent: function(component,event,helper)
    {
        var cmpEvent = component.getEvent("componentEvent");
        cmpEvent.setParams({
            "showModal" : false,
            "context" : "Hide_Edit_Modal"
        });
        cmpEvent.fire();
        component.set("v.showModal",false);
    },
    saveWebinarDetails: function(component,event,helper)
    {
        var selectedstatus = component.get('v.selectedWebinarStatus');
        var selectedpublic = component.get('v.selectedIsPublic');
        component.set('v.showSpinner',true);
        console.log('selectedstatus>>',selectedstatus);
        console.log('selectedpublic>>',selectedpublic);
        var webinarRecordTobeUpdated = component.get('v.webinarRecord');
        webinarRecordTobeUpdated.Status__c = component.get('v.selectedWebinarStatus');
        webinarRecordTobeUpdated.Public__c = component.get('v.selectedIsPublic');
        console.log('webinarRecordTobeUpdated>>',webinarRecordTobeUpdated.status__C);
        var action = component.get("c.saveWebinarRecord");
        action.setParams(
            { 
                "webinarRecord" : JSON.stringify(webinarRecordTobeUpdated)
            });
        
        action.setCallback(this,function(response){
            console.log('response>>',response);
            component.set('v.showSpinner',false);
            var state = response.getState();
            if (state === "SUCCESS") {
                this.editWebinarSuccessToast(component,event,helper);
            }
            else{
                this.editWebinarErrorToast
            }
            helper.fireComponentEvent(component,event,helper);
        });
        
        $A.enqueueAction(action);
        
    },
    editWebinarSuccessToast : function(component, event, helper) {
        var editsuccessLabel = $A.get("$Label.c.SFMC_Webinar_Edit_Success");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": editsuccessLabel,
            "type":"success"
        });
        toastEvent.fire();
    },
    
    editWebinarErrorToast : function(component, event, helper) {
        var editerrorLabel = $A.get("$Label.c.SFMC_Webinar_Edit_Error");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error!",
            "message": editerrorLabel,
            "type": "error"
        });
        toastEvent.fire();
    },
    
})