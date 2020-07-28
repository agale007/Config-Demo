({
    init : function(cmp,evt,hlp) {
        cmp.set('v.visit',{});
        cmp.set('v.isModalOpen', true);
        cmp.find('createAppointment').set('v.disabled', true);
        hlp.getSpecialist(cmp,hlp);
    },
    
    hospitalKeyUp: function (cmp, evt, hlp) {
        var isEnterKey = evt.keyCode === 13;
        var queryTerm = cmp.find('hospital').get('v.value');
        if (isEnterKey) {
            cmp.find('hospital').set('v.isLoading', true);
            setTimeout(function() {
                alert('Searched for "' + queryTerm + '"!');
                cmp.find('hospital').set('v.isLoading', false);
            }, 2000);
        }
    },

    doctorKeyUp: function (cmp, evt, hlp) {
        var isEnterKey = evt.keyCode === 13;
        var queryTerm = cmp.find('doctor').get('v.value');
        if (isEnterKey) {
            cmp.find('doctor').set('v.isLoading', true);
            setTimeout(function() {
                alert('Searched for "' + queryTerm + '"!');
                cmp.find('doctor').set('v.isLoading', false);
            }, 2000);
        }
    },

    openModel: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isModalOpen", true);
     },
    
     closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen", false);
        $A.get("e.force:closeQuickAction").fire();
     },
    
     submitDetails: function(component, event, helper) {
        // Set isModalOpen attribute to false
        //Add your code to call apex method or do some processing
        component.set("v.isModalOpen", false);
     },

     checkSlots : function(cmp,evt,hlp) {
        cmp.find('picker').checkSlots();
     },

     selected : function(cmp,evt,hlp) {
         cmp.find('createAppointment').set('v.disabled',false);
     },

     createAppointment : function(cmp,evt,hlp) {
        let visit = cmp.get('v.visit');
        visit.Patient__c = cmp.get('v.recordId');
        visit.VisitDate__c = cmp.get('v.selectedSlot');
        visit.JunctionId__c = cmp.get('v.selection')[0].id;
        //cmp.set('v.visit',visit);
        //hlp.createPatientAppointment(cmp,hlp);

        var action = cmp.get("c.upsertPatientAppointment");
        action.setParams({visit : visit});
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                hlp.showToast(cmp,hlp);
                $A.get("e.force:closeQuickAction").fire();
                $A.get("e.force:refreshView").fire();

            } else if(state === 'ERROR') {
                console.log('Could not get Specialist');
            }
        });
        $A.enqueueAction(action);


     },
});