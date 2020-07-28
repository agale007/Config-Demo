({
	doInit : function(component, event, helper) {
        var prefixString = $A.get('$Resource.LandingPageImages') + '/assets/images/';
        component.set('v.prefixString', prefixString);
    },
    saveTextAlertPreference : function(component, event, helper){
        var allValid = component.find('prefeneceField').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);

        
        if (allValid) {            
            helper.saveTextAlert(component, helper, event);
            component.set('v.showPreferenceForm', false); 
        }
    },
    
    changePhoneNumber : function (component, event, helper) {  
        helper.changePhoneNumber(component, event, helper);
    }
})