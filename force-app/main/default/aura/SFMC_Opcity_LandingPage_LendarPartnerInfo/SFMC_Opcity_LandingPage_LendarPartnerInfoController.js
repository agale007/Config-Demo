({
	doInit: function(component, event, helper) {
        //Load State field values
        //helper.fetchPickListVal(component, 'State__c');
        // Prepare a new record from template
        helper.prepareTemplate(component,event,helper);        
        //Populate default value
        //helper.defaultValuesFROMCM(component,event,helper);
        
    },
    changePhoneNumber : function (component, event, helper) {  
        helper.changePhoneNumber(component, event, helper);
    },
    
    saveFormSubmission : function(component, event, helper){
        
        
        
        var allValid = component.find('contactField').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        if(allValid){
            component.set("v.showThankYou",true);
            var newFormSubmissionObj = component.get("v.formSubmissionObj");
            var urlParam = component.get('v.urlParamMap');
            var urlParamStr = JSON.stringify(urlParam);
            var saveAction = component.get('c.saveFormSubmissionRecord');

            saveAction.setParams({
                urlParam : urlParamStr,
                formSubmissionRecord : newFormSubmissionObj
            });
            $A.enqueueAction(saveAction);
                    console.log('Form Submission Created');
            
            /*var recordCreatorService = component.find("formSubmissionRecordCreator").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                    var urlParam = component.get('v.urlParamMap');                    
                    var urlParamStr = JSON.stringify(urlParam);
                    var newFormSubmissionObjStr = JSON.stringify(newFormSubmissionObj);
                    var saveAction = component.get('c.saveFormSubmissionRecord');
                    saveAction.setParams({
                        urlParam : urlParamStr,
                        formSubmissionRecord : newFormSubmissionObj
                	});
                
                //
                    
                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving contact, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            });*/
        }
    },
    
    saveConfiguration : function(component, event, helper){
        //Get the event message attribute
        var product = event.getParam("product");
        var submissionType = event.getParam("submissionType");
        var campaignId = event.getParam("campaignId");
        component.set('v.productType',product);
        component.set('v.submissionType',submissionType);
        component.set('v.campaignId',campaignId);
    }
})