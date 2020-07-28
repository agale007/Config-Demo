({
    
//=================================Inialiase======================================================//
  doInit: function(component, event, helper) {
    // Fetch the account list from the Apex controller
    helper.fetchactiveuserlist(component, event, helper);
    //helper.fetchoptionlist(component, event, helper);
    helper.getEventList(component);
  },

//=================================call registrants button==========================================//
  gotoregistrants: function(component, event, helper) {
    var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
    var EventwhatId = event.target.getElementsByClassName("Event-WhatId")[0].value;
    console.log('evtid'+EventId);
    component.set("v.Eventid", EventId);
    component.set("v.campid", EventwhatId);
    component.set("v.displayedSection","section2");
  },
    
    edit : function(component, event, helper) {
        /*var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": component.get("v.recordId")
        });
        editRecordEvent.fire();*/
     var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
    var EventwhatId = event.target.getElementsByClassName("Event-WhatId")[0].value;
        console.log('evtid'+EventId);
    component.set("v.Eventid", EventId);
    component.set("v.campid", EventwhatId);
    component.set("v.isEdit",true);
    },

//=======================Delete Event Popup Modal show===============================================================//
  deleteEvent: function(component, event, helper) {
    
    var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
    var EventwhatId = event.target.getElementsByClassName("Event-WhatId")[0].value;
    component.set("v.Eventid", EventId);
    component.set("v.campid", EventwhatId);
    component.set("v.isDelete", true);

    /*confirm('Delete the ' + EventId + ' account? (don’t worry, this won’t actually work!)');
        var action = component.get("c.deleteevent");
        action.setParams({ 
        "evtid": EventId,
        "Camid":EventwhatId
         });
        action.setCallback(this, function(a) {
           var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
            
               alert("success"+name);
                  }
         else
         {
             alert("Failed");
            
         }
        });
    $A.enqueueAction(action);
    component.updateEventList();*/
  },

//==============================================Add new Event Popup Modal Show======================//  
    addevent: function(component, event, helper) {
    // Pop up Add new Event UI
    component.set("v.isOpen", true);
  },
  cancel: function(cmp, evt, helper) {
    cmp.set("v.isOpen", false);
    cmp.set("v.isDelete", false);
    cmp.set("v.eventRecord",{'sobjectType': 'Event',
                             'Name':'',
                             'Subject':'',
                             'OwnerId':'',
                             'CreatedById':'',
                             'EndDateTime':'',
                             'StartDateTime':'',
                             'CreatedById':'',
                             'ActivityDate':'',
                             'PublicEvent__c':'',
                             'Location':''
                             });
       cmp.set("v.campaignRecord",{ 'sobjectType': 'Campaign',
                             'Name':''
                             });
  },

//===========================================Save New Event========================================//
  save: function(component,evt, helper) {
    // cmp.updateAcc();
    //cmp.set("v.isOpen",false);

    if (helper.validateForm(component,event,helper)) {
      var newevt = component.get("v.eventRecord");
      var newcam = component.get("v.campaignRecord");
      var action = component.get("c.saveevent");
      action.setParams({
        evt: newevt,
        cam: newcam
      });
      action.setCallback(this, function(a) {
        var state = a.getState();
        if (state === "SUCCESS") {
          var name = a.getReturnValue();

          alert("success");
          component.set("v.isOpen", false);
        component.set("v.eventRecord",{'sobjectType': 'Event',
                             'Name':'',
                             'Subject':'',
                             'OwnerId':'',
                             'CreatedById':'',
                             'EndDateTime':'',
                             'StartDateTime':'',
                             'CreatedById':'',
                             'ActivityDate':'',
                             'PublicEvent__c':'',
                             'Location':''
                             });
          component.set("v.campaignRecord",{ 'sobjectType': 'Campaign',
                             'Name':''
                             });
        } else {
          alert("Failed");
          component.set("v.isOpen", false);
          component.set("v.eventRecord",{'sobjectType': 'Event',
                             'Name':'',
                             'Subject':'',
                             'OwnerId':'',
                             'CreatedById':'',
                             'EndDateTime':'',
                             'StartDateTime':'',
                             'CreatedById':'',
                             'ActivityDate':'',
                             'PublicEvent__c':'',
                             'Location':''
                             });
          component.set("v.campaignRecord",{ 'sobjectType': 'Campaign',
                             'Name':''
                             });
        }
      });
      $A.enqueueAction(action);
      component.updateEventList();
        //formeval.reset();
    }
  },

//===============================================Delete Event====================================//
  Delete: function(component, event, helper) {
    var EventId = component.get("v.Eventid");

    var EventwhatId = component.get("v.campid");

    console.log("evtid" + EventId);
    console.log("camid" + EventwhatId);
    var action = component.get("c.deleteevent");
    action.setParams({
      evtid: EventId,
      Camid: EventwhatId
    });
    action.setCallback(this, function(a) {
      var state = a.getState();
      if (state === "SUCCESS") {
        var name = a.getReturnValue();

        alert("successfully delete");
        component.set("v.isDelete", false);
      } else {
        alert("Failed");
        component.set("v.isDelete", false);
      }
    });
    $A.enqueueAction(action);
    component.updateEventList();
    component.set("v.eventRecord",{ 'sobjectType': 'Event',
                             'Name':'',
                             'Subject':'',
                             'OwnerId':'',
                             'CreatedById':'',
                             'EndDateTime':'',
                             'StartDateTime':'',
                             'CreatedById':'',
                             'ActivityDate':'',
                             'PublicEvent__c':'',
                             'Location':''
                             });
  }
});