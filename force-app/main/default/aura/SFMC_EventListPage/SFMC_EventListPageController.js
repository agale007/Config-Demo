({
    
    
    doInit: function(component, event, helper) {
        
        helper.fetchPublicEventpicklist(component, event, helper);
        helper.fetchEventStatuspicklist(component, event, helper);
        helper.fetchTargetAccountTypepicklist(component, event, helper);
        helper.fetchEventTypepicklist(component, event, helper);
        helper.fetchTargetProductCodepicklist(component, event, helper);
        helper.fetchStatepicklist(component, event, helper);
        helper.getEventList(component);
        helper.getInactiveList(component);
        component.set("v.displayedSection","section1");
        component.set("v.isInactiveShow",true);
        component.set("v.isRegisterants",false);
        component.set("v.isEdit",false);
        component.set("v.isOpen", false);
        component.set("v.isDelete", false);
        
    },
    
    //---------------------------------------------------------//
    validateMapURL: function(component,event,helper)
    {
        var urlField = event.getSource();
        var urlLength = urlField.get('v.value').length;
        urlField.setCustomValidity('');
        urlField.reportValidity();
        if(urlLength > 250 && urlLength != 0){
            var errorLabel = $A.get("Its to Long");
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
    
    //---------------------------------------------------------//   
    handleApplicationEvent : function(cmp, event) {
        var message = event.getParam("compset");
    },
    
    
    
    
    
    //---------------------------------------------------------//     
    handleComponentEvent : function(component,event,helper)
    {
        var params = event.getParams();
        if(params.context=='Hide_Edit_Modal')
            component.set("v.isEdit",params.showModal);
    },  
    //---------------------------------------------------------//    
    handleActiveEvent : function(component,event,helper)
    {
        var params = event.getParams();
        component.set("v.displayedSection",params.Hideevent);
        component.set("v.Eventid", params.Eventid);
        component.set("v.campid", params.campid);
        component.set("v.campName", params.campName);
        component.set("v.isActive", params.displayedbuttonandstatus);
        component.set("v.isRegistered", params.isRegistered);
    },
    
    //-----------------------------------------------------//
    deleteEvent: function(component, event, helper) {
        var EventId = event.target.getElementsByClassName('Event-Id')[0].value;
        var EventCampId = event.target.getElementsByClassName("Event-WhatId")[0].value;
        component.set("v.Eventid", EventId);
        component.set("v.campid", EventCampId);
        component.set("v.isDelete", true);
    },
    
    //-----------------------------------------------------//
    addEvent: function(component, event, helper) {
        component.set("v.isOpen", true);
        component.set("v.isMessage", false);
        component.set("v.Message","");
    },
    
    //-----------------------------------------------------//
    cancel: function(component, event, helper) {
        component.set("v.isOpen", false);
        component.set("v.isDelete", false);
        component.set("v.isMessage", false);
        component.set("v.Message","");
        helper.Resettingvalues(component, event, helper);
    },
    
    //-----------------------------------------------------//
    hideModal: function(component, event, helper) {
        component.set("v.isOpen", false);
        component.set("v.isDelete", false);
        component.set("v.isMessage", false);
        component.set("v.Message","");
        helper.Resettingvalues(component, event, helper);
    },
    
    
    //-----------------------------------------------------------------------------------------------//    
    save: function(component,evt, helper) {
        var validExpense = component.find('formfields').reduce(function (validSoFar, inputCmp) {
            
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        if(validExpense){
            helper.saverecord(component,event, helper);
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
        if(component.get("v.campaignRecord.StartDate") != '' && component.get("v.campaignRecord.StartDate") < todayFormattedDate){
            component.set("v.startDateValidator" , true);
        }else{
            component.set("v.startDateValidator" , false);
        }
    },
    
    
    
    //---------------------------------------------------------//   
    endDateVlidater: function(component, event, helper) {
        if(component.get("v.campaignRecord.EndDate") != '' && component.get("v.campaignRecord.EndDate") < component.get("v.campaignRecord.StartDate")){
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
        var rawDate = component.get("v.eventRecord.Start_Date_Time__c");
        var formattedDate = $A.localizationService.formatDate(rawDate, "yyyy-MM-ddTHH:mm:ss");
        if(formattedDate != '' && formattedDate < todayFormattedDateAndTime){
            component.set("v.eventStartDateValidator" , true);
        }else{
            component.set("v.eventStartDateValidator" , false);
        }
    },
    
    //---------------------------------------------------------//   
    eventEndDateVlidater: function(component, event, helper) {
        var rawStartDate = component.get("v.eventRecord.Start_Date_Time__c");
        var formattedStartDate = $A.localizationService.formatDate(rawStartDate, "yyyy-MM-ddTHH:mm:ss");
        var rawEndDate = component.get("v.eventRecord.End_Date_Time__c");
        var formattedEndDate = $A.localizationService.formatDate(rawEndDate, "yyyy-MM-ddTHH:mm:ss");
        if(formattedEndDate != '' && formattedEndDate < formattedStartDate){
            component.set("v.eventEndDateValidator" , true);
        }else{
            component.set("v.eventEndDateValidator" , false);
        }
    },
    
    
});