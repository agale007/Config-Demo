({
    getSpecialist : function (cmp,hlp) {
        var action = cmp.get("c.getSpecialist");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //cmp.set("v.opportunities", response.getReturnValue());
                let result = JSON.parse( response.getReturnValue());
                /*var op = {
                    selectedColorId: 2,
                    colors: [
                        { id: 1, label: 'Red' },
                        { id: 2, label: 'Green'},
                        { id: 3, label: 'Blue'}
                    ]
                };*/
                let options = [
                    { name: 'None', label: 'None' }
                ];

                let option = {};
                for(let item of result) {
                    option = {};
                    option.name = item.value;
                    option.label = item.label;
                    options.push(option);
                }
                cmp.set('v.specialistOptions', options);
            } else if(state === 'ERROR') {
                console.log('Could not get Specialist');
            }
        });
        $A.enqueueAction(action);
    },


    createPatientAppointment : function(cmp,hlp) {
        var action = cmp.get("c.upsertPatientAppointment");
        // /action.setParams({visit : cmp.get('v.visit')});
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //Show toast 
                //Navigate to Contact if needed

            } else if(state === 'ERROR') {
                console.log('Could not get Specialist');
            }
        });
        $A.enqueueAction(action);
    },
    showToast : function(cmp, hlp) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "Appointment is successfully scheduled.",
            'type':'success'
        });
        toastEvent.fire();
    }
});