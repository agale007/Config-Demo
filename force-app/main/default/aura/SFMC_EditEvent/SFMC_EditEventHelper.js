({
    fetchPublicEventpicklist: function(component, event, helper) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            objName: 'EventAndWebinar__c',
            fldName: 'Public__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.PublicEvent", response.getReturnValue());
                
            }
        });
        $A.enqueueAction(action);
    },
    
    //------------------------------------------------------------------//
    fetchStatepicklist: function(component, event, helper) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            objName: 'EventAndWebinar__c',
            fldName: 'Venue_Hotel_state__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.States", response.getReturnValue());
                
            }
        });
        $A.enqueueAction(action);
    },
    //-------------------------------------------Update record-----------------------------------------//
    updateRecord: function(component,event, helper) {
        var newEvt = component.get("v.Events");
        var isClone = component.get("v.isClone");
        
        component.set("v.showSpinner", true);
        var action = component.get("c.updateEventRecord");
        action.setParams({
            eventRec: newEvt,
            isClone:isClone
            });
        action.setCallback(this, function(a) {
            var state = a.getReturnValue();
            if (state) {
                var name = a.getReturnValue();
                component.set("v.showSpinner", false);
                if(isClone)
                {
                    this.cloneEventSuccessToast(component,event,helper); 
                }
                else
                {
                    this.editEventSuccessToast(component,event,helper);
                }
               
			    var cmpEvent = component.getEvent("componentEvent");
                cmpEvent.setParams({
                    "showModal" : false,
                    "context" : "Hide_Edit_Modal"
                });
                cmpEvent.fire(); 
                component.set("v.closemodal",false); 
                
            } else {
                
                component.set("v.showSpinner", false);
                this.editEventErrorToast(component,event,helper);
                var cmpEvent = component.getEvent("componentEvent");
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
    
    //------------------------------------------------------------------------------------------------//   
    getRecordDetails : function(component,event,helper) {
        var evtids=component.get("v.Eventid");
        
        var  action = component.get("c.getEventRecord");
        action.setParams({
            eventId: evtids
        });
        
        action.setCallback(this, function(actionResult) {
            var TotalReg=actionResult.getReturnValue();
            
            if(TotalReg.Status__c =='Active')
            {
                component.set("v.EventActive",true);
            }
            else
            {
                component.set("v.EventActive",false);
            }
            component.set("v.Events",TotalReg);
            component.set("v.closemodal",true);
        });
        $A.enqueueAction(action);
    },
    //--------------------------------------------------------------------//
    fetchTargetAccountTypepicklist: function(component, event, helper) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            objName: 'Campaign',
            fldName: 'Target_Account_Type__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.TargetAccType", response.getReturnValue());
                
            }
        });
        $A.enqueueAction(action);
    },
    
    //---------------------------------------------------------//
    fetchEventTypepicklist: function(component, event, helper) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            objName: 'Campaign',
            fldName: 'Type'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.EventType", response.getReturnValue());
              
            }
        });
        $A.enqueueAction(action);
    },
    //--------------------------------------------------------------------------------------------//
    fetchTargetProductCodepicklist: function(component, event, helper) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            objName: 'Campaign',
            fldName: 'Target_Product__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.TargetProCode", response.getReturnValue());
               
            }
        });
        $A.enqueueAction(action);
    },
    
    editEventSuccessToast : function(component, event, helper) {
        var editsuccessLabel = $A.get("$Label.c.SFMC_Event_Campaign_Edit_Success");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": editsuccessLabel,
            "type":"success"
        });
        toastEvent.fire();
    },
    
    editEventErrorToast : function(component, event, helper) {
        var editerrorLabel = $A.get("$Label.c.SFMC_Event_Campaign_Edit_Error");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error!",
            "message": editerrorLabel,
            "type": "error"
        });
        toastEvent.fire();
    },
    
    cloneEventSuccessToast : function(component, event, helper) {
        var editsuccessLabel = $A.get("$Label.c.SFMC_Add_Event_Success");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": editsuccessLabel,
            "type":"success"
        });
        toastEvent.fire();
    },
    
})