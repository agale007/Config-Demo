({
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
            
            saveAction.setCallback(this, function(data){
            	console.log('Form submission created');
        	});
            $A.enqueueAction(saveAction)
        }
        
        /*var saveAction = component.get('c.saveFormSubmissionRecord');
        saveAction.setParams({
            formSubmissionRecord : newFormSubmissionObj
        });
        $A.enqueueAction(saveAction);*/
    },
    
    saveConfiguration : function(component, event, helper){
        //Get the event message attribute
        var product = event.getParam("product");
        var submissionType = event.getParam("submissionType");
        var campaignId = event.getParam("campaignId");
        component.set('v.productType',product);
        component.set('v.submissionType',submissionType);
        component.set('v.campaignId',campaignId);
    },
    
    doInit: function(component, event, helper) {
        
        // Prepare a new record from template
        helper.prepareTemplate(component,event,helper);
        /*
        component.find("formSubmissionRecordCreator").getNewRecord(
            "Form_Submission__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newFSRecord");
                var error = component.get("v.fSError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.apiName);
            })
        );*/
    },
    
    changePhoneNumber : function (component, event, helper) {  
        helper.changePhoneNumber(component, event, helper);
    },
})