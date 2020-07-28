({
	doInit : function(component, event, helper) {
		
        
        console.log('window.location.href = ' + window.location.href);
        var vars = {};
        
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });	
        console.log('vars = ' + vars);
        if(vars['producttype'] != undefined){
            component.set('v.productType', vars['producttype']);
        }
        
        helper.getFormSubmissionRecord(component, event, helper,true);
	},
    saveFormSubmission : function(component, event, helper){
               
        var allValid = component.find('contactField').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        console.log("allValid->"+allValid);
        if(allValid){
            component.set("v.showThankYou",true);
            var recordCreatorService = component.find("formSubmissionRecordCreator").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                   	console.log('Form Submission Created');

                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving contact, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }       
        
    },
    changePhoneNumber : function (component, event, helper) {  
        helper.changePhoneNumber(component, event, helper);
    }
})