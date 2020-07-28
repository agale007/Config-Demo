({
    
    //----------------------------------------------//
    getEventList: function(component) {
        var action = component.get("c.getAllActiveInactiveEvents");
        action.setParams({
            isActive: 'Active'
        });
        var self = this;
        action.setCallback(this, function(actionResult) {
            var josnArr = this.formatEventsData(actionResult.getReturnValue());
            component.set("v.Events", actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    getInactiveList: function(component){
        var action = component.get("c.getAllActiveInactiveEvents");
        var status = $A.get("$Label.c.SFMC_Inactive_Status");
        action.setParams({
            isActive: status
        });
        var self = this;
        action.setCallback(this, function(actionResult) {
            var josnArr = this.formatEventsData(actionResult.getReturnValue());
            component.set("v.inactiveEvents", josnArr);
            
        });
        $A.enqueueAction(action);
    },
    
    
    //----------------------------------------------//
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
    
    //--------------------------------------------//
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
    //--------------------------------------------//
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
    
    //--------------------------------------------//
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
    
    //--------------------------------------------//
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
    
    //--------------------------------------------//
    fetchEventStatuspicklist: function(component, event, helper) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            objName: 'EventAndWebinar__c',
            fldName: 'Status__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.EventStatus", response.getReturnValue());
                
            }
        });
        $A.enqueueAction(action);
    },
    
    //--------------------------------------------//
    saverecord: function(component,event, helper) {
        var newEvt = component.get("v.eventRecord");
        var newCamp = component.get("v.campaignRecord");
        
        component.set('v.showSpinner',true);
        var action = component.get("c.saveEvent");
        action.setParams({
            eventRec: newEvt,
            campRec: newCamp
            
        });
        action.setCallback(this, function(a) {
            var state = a.getReturnValue();
            
            if (state) {
                this.addEventSuccessToast(component,event,helper);
                component.set("v.isInactiveShow", false);
                component.set('v.showSpinner',false);
                component.set("v.isInactiveShow", true);
                var name = a.getReturnValue();
                helper.Resettingvalues(component,event, helper);
                component.set("v.isOpen", false);
                
            } else {
                this.addEventErrorToast(component,event,helper);
                component.set('v.showSpinner',false);;
                helper.Resettingvalues(component,event, helper);
                component.set("v.isOpen", false);
            }
        });
        $A.enqueueAction(action);
        component.updateEventList();
    },
    
    //--------------------------------------------------------------------//
    Resettingvalues: function(component, event, helper) 
    {
        component.set("v.eventRecord",{'sobjectType': 'EventAndWebinar__c',
                                       'Name':'',
                                       'Name__c':'',
                                       'Start_Date_Time__c':'',
                                       'End_Date_Time__c':'',
                                       'Event_Time_Display__c':'',
                                       'Public__c':'',
                                       'Status__c':'',
                                       'Event_Speakers__c':'',
                                       'Venue_Hotel_Name__c':'',
                                       'Venue_Hotel_Address__c':'',
                                       'Venue_Hotel_City__c':'',
                                       'Venue_Hotel_Territory__c':'',
                                       'Venue_Hotel_state__c':'',
                                       'Venue_Hotel_Zipcode__c':'',
                                       'Meeting_Room__c':'',
                                       'Parking_Information__c':'',
                                       'Venue_Hotel_Map_URL__c':'',
                                       'Campaign__c':'',
                                       'Description__c':''
                                      });
        component.set("v.campaignRecord",{ 'sobjectType': 'Campaign',
                                          'Name':'',
                                          'Description':'',
                                          'Type':'',
                                          'Target_Account_Type__c':'',
                                          'Target_Product_Code__c':'',
                                          'StartDate':'',
                                          'EndDate':'',
                                          'Target_Product__c':''
                                         });
    } ,
    
    addEventSuccessToast : function(component, event, helper) {
        var successLabel = $A.get("$Label.c.SFMC_Add_Event_Success");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": successLabel,
            "type":"success"
        });
        toastEvent.fire();
    },
    addEventErrorToast : function(component, event, helper) {
        var errorLabel = $A.get("$Label.c.SFMC_ErrorEventAdd");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error!",
            "message": errorLabel,
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
});