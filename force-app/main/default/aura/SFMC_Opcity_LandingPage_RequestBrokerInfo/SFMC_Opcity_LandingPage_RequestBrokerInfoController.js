({
	handelRoleChnage : function(component, event, helper) {
		var selectValue= component.get("v.formSubmissionObj.Role__c");
        if(selectValue == 'Broker' || selectValue == 'Other'){
            component.set("v.showBrokerFields", true);
        }
        else{
            component.set("v.showBrokerFields", false);
        }
        if(selectValue == 'Agent'){
            component.set("v.showAgentFields", true);
        }
        else{
            component.set("v.showAgentFields", false);
        }
	},
    handleExistingOpcity : function(component, event, helper){
        var selectedRadio = event.getSource().get("v.value");
        if(selectedRadio == "Yes"){
            component.set("v.showLeadValues", true);
            component.set("v.formSubmissionObj.Already_Using_Opcity__c",true);
        }else{
            component.set("v.showLeadValues", false);
            component.set("v.formSubmissionObj.Already_Using_Opcity__c",false);
        }
    },
    handleZipChange : function(component, event, helper) {
		var zipVal= component.get("v.formSubmissionObj.Zip_Code__c");
        if(!$A.util.isEmpty(zipVal)){
            component.set("v.showAdditionalZip", true);
        }else{
            component.set("v.showAdditionalZip", false);
        }
	},
    
    handleLeadGen : function(component, event, helper) {
		var selectedRadio = event.getSource().get("v.value");
        
        if(selectedRadio == "Yes"){
            component.set("v.showLeadValues", true);
            component.set("v.formSubmissionObj.is_Generating_lead__c",true);
        }else{
            component.set("v.showLeadValues", false);
            component.set("v.formSubmissionObj.is_Generating_lead__c",false);
        }
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
        }
        /*var saveAction = component.get('c.saveFormSubmissionRecord');
        saveAction.setParams({
            formSubmissionRecord : newFormSubmissionObj
        });
        $A.enqueueAction(saveAction);*/
    },
    
    doInit: function(component, event, helper) {
        //Load State values
        //helper.fetchPickListVal(component, 'State__c');
        // Prepare a new record from template
        helper.prepareTemplate(component,event,helper);
       /* component.find("formSubmissionRecordCreator").getNewRecord(
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