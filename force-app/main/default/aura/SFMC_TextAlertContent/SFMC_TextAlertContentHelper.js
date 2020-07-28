({
	saveTextAlert : function(component, helper, event) {       	
        var phoneNumber = component.get("v.phone");
        var firstName = component.get("v.firstName");
        var lastName = component.get("v.lastName");
        var email = component.get("v.email");
        console.log('phoneNumber-->'+phoneNumber);
		
        var action = component.get('c.savePreferenceRecord');        
         action.setParams({
        	mobileNumber : phoneNumber,
             firstName : firstName,
             lastName : lastName,
             email : email
    	});
        action.setCallback(this,function(data){
            console.log('in call back');
            if(data.getState() === 'SUCCESS'){
                if(data.getReturnValue()){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "Text alert submitted successfully."
                    });
                    toastEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
	},
    
    changePhoneNumber : function(component, event, helper){
        var currentNumber = component.get("v.phone");
        currentNumber = currentNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        component.set("v.phone",currentNumber);
        
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
    }
})