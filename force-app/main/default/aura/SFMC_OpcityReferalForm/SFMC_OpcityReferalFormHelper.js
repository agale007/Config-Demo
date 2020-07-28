({
	getFormSubmissionRecord : function(component, event, helper,isFromInit) {
        component.find("formSubmissionRecordCreator").getNewRecord(
            "Form_Submission__c", // sObject type (entityAPIName)
            null,      // recordTypeId
            true,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newFormSubmission");
                var error = component.get("v.newFormSubmissionError");
                
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    helper.populateAllValues(component, event, helper,isFromInit);
                }
            })
        );
    },
    changePhoneNumber : function(component, event, helper){
        var currentNumber = component.get("v.simpleNewFormSubmission.Phone__c");
        currentNumber = currentNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        component.set("v.simpleNewFormSubmission.Phone__c",currentNumber);
        
        var phoneField = event.getSource();
        phoneField.setCustomValidity('');
        phoneField.reportValidity(); 
        
        var phoneLength = phoneField.get('v.value').length;
        if(phoneLength < 10 && phoneLength != 0){
            var errorLabel = $A.get("$Label.c.Phone_number_too_short");
            phoneField.setCustomValidity(errorLabel);
            phoneField.reportValidity();
            return;
        }
        if(phoneLength == 10){
            phoneField.setCustomValidity('');
            phoneField.reportValidity();
        }
    },
    populateAllValues : function(component, event, helper,isFromInit){
        if(isFromInit){
                  
        	component.set('v.simpleNewFormSubmission.Form_Type__c', 'Referral form');
            
            var action = component.get('c.getGeneratingLeadValues');
            
            action.setCallback(this, function(data){
                if (data.getState() === "SUCCESS") {
                    var returnValue = data.getReturnValue();                    
                    component.set('v.generatingLeadValues', JSON.parse(returnValue));
                    //helper.populateValueForParam(component, returnValue,event,helper,isFromInit);
                }else if (data.getState() === "ERROR"){
                    var errors = data.getError();
                    console.log('errors = ' +errors);
                    if (errors) {
                        for(var i=0; i < errors.length; i++) {
                            console.log('page errors = ' +errors[i].pageErrors );
                            console.log('page errors = ' +errors[i].fieldErrors );
                            console.log('message errors = ' +errors[i].message );
                        }
                    }
                }
            });       
            $A.enqueueAction(action);
        }
        else{
            //helper.populateValueForParam(component, component.get('v.picklistLabelvalueMap'),event,helper,isFromInit);
        }
    }
})