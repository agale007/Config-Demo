({
    getRecord: function(component,event,helper){
        helper.fetchPublicEventpicklist(component, event, helper);
        helper.fetchTargetAccountTypepicklist(component, event, helper);
        helper.fetchEventTypepicklist(component, event, helper);
        helper.fetchTargetProductCodepicklist(component, event, helper);
        helper.fetchStatepicklist(component, event, helper);
        helper.getRecordDetails(component,event,helper);
    },
    
    //-------------------------------------------------------------//
    validateMapURL: function(component,event,helper)
    {
        var urlField = event.getSource();
        var urlLength = urlField.get('v.value').length;
        urlField.setCustomValidity('');
        urlField.reportValidity();
        if(urlLength > 250 && urlLength != 0){
            var errorLabel = $A.get("It's to Long");
            urlField.setCustomValidity(errorLabel);
            urlField.reportValidity();
            return;
        }
        if(urlLength==250)
        {
            urlField.setCustomValidity('');
            urlField.reportValidity();
            
        }  
    },
    
    //---------------------------------------//
    cancel: function(component, evt, helper) {
        component.set("v.isMessageSuccess", false);
        component.set("v.isMessageError", false);
        component.set("v.Message","");
        var cmpEvent = component.getEvent("componentEvent");
        cmpEvent.setParams({
            "showModal" : false,
            "context" : "Hide_Edit_Modal"
        });
        cmpEvent.fire();
        component.set("v.closemodal",false);
    },
    
    
     //-----------------------------------//
    hideModal: function(component, evt, helper) {
        component.set("v.isMessageSuccess", false);
        component.set("v.isMessageError", false);
        component.set("v.Message","");
        var cmpEvent = component.getEvent("componentEvent");
        cmpEvent.setParams({
            "showModal" : false,
            "context" : "Hide_Edit_Modal"
        });
        cmpEvent.fire();
        component.set("v.closemodal",false);
    },

    //-----------------------------------//
    save: function(component,evt, helper) 
    {
        
        var validExpense = component.find('formfields').reduce(function (validSoFar, inputCmp) {
            
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        if(validExpense){
             helper.updateRecord(component,event, helper);
        }
    },
    
    
    //---------------------------------------------------------//   
    
    startDateVlidater: function(component, event, helper) {
        
        var today = new Date();        
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        // if date is less then 10, then append 0 before date   
        if(dd < 10){
            dd = '0' + dd;
        } 
        // if month is less then 10, then append 0 before date    
        if(mm < 10){
            mm = '0' + mm;
        }
        
        var todayFormattedDate = yyyy+'-'+mm+'-'+dd;
        if(component.get("v.Events.Campaign__r.StartDate") != '' && component.get("v.Events.Campaign__r.StartDate") < todayFormattedDate){
            component.set("v.startDateValidator" , true);
        }else{
            component.set("v.startDateValidator" , false);
        }
    },
    
    
    
    //---------------------------------------------------------//   
    endDateVlidater: function(component, event, helper) {
        if(component.get("v.Events.Campaign__r.EndDate") != '' && component.get("v.Events.Campaign__r.EndDate") < component.get("v.Events.Campaign__r.StartDate")){
            component.set("v.endDateValidator" , true);
        }else{
            component.set("v.endDateValidator" , false);
        }
    },
    //---------------------------------------------------------//   
    eventStartDateVlidater: function(component, event, helper) {
        
        var today = new Date();        
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();
        var ss = today.getSeconds();
        
        // if date is less then 10, then append 0 before date   
        if(dd < 10){
            dd = '0' + dd;
        } 
        // if month is less then 10, then append 0 before date    
        if(mm < 10){
            mm = '0' + mm;
        }
        if(hh < 10){
            hh = '0' + hh;
        } 
        if(min < 10){
            min = '0' + min;
        } 
        if(ss < 10){
            ss = '0' + ss;
        } 
        
        var todayFormattedDate = yyyy+'-'+mm+'-'+dd; 
        var todayFormattedTime = hh+':'+min+':'+ss;
        
        var todayFormattedDateAndTime = todayFormattedDate+'T'+todayFormattedTime;
        var rawDate = component.get("v.Events.Start_Date_Time__c");
        var formattedDate = $A.localizationService.formatDate(rawDate, "yyyy-MM-ddTHH:mm:ss");
        if(formattedDate != '' && formattedDate < todayFormattedDateAndTime){
            component.set("v.eventStartDateValidator" , true);
        }else{
            component.set("v.eventStartDateValidator" , false);
        }
    },
    
    //---------------------------------------------------------//   
    eventEndDateVlidater: function(component, event, helper) {
        var rawStartDate = component.get("v.Events.Start_Date_Time__c");
        var formattedStartDate = $A.localizationService.formatDate(rawStartDate, "yyyy-MM-ddTHH:mm:ss");
        var rawEndDate = component.get("v.Events.End_Date_Time__c");
        var formattedEndDate = $A.localizationService.formatDate(rawEndDate, "yyyy-MM-ddTHH:mm:ss");
        if(formattedEndDate != '' && formattedEndDate < formattedStartDate){
            component.set("v.eventEndDateValidator" , true);
        }else{
            component.set("v.eventEndDateValidator" , false);
        }
    },
    
})