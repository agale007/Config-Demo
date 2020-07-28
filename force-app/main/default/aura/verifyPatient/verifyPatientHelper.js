({
    verifyPatient : function (cmp,hlp) {
        var action = cmp.get("c.verifyPatientRecord");
        var record = cmp.get("v.recordId");
        action.setParams({
            recordId : record
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            $A.get("e.force:closeQuickAction").fire();
            if (state === "SUCCESS") {
                
                let result = JSON.parse( response.getReturnValue());
                var toastEvent = $A.get("e.force:showToast");
                               
                
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Patient has been verified.",
                    "type": "success"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            } else if(state === 'ERROR') {
                console.log('Could not get Specialist');
            }
            
        });
        $A.enqueueAction(action);
    },
})