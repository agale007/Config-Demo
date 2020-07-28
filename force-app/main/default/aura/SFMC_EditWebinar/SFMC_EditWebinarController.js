({
	hideModal : function(component, event, helper) {
		console.log('In handle component event>>');
        //component.set("v.showModal",false);
		helper.fireComponentEvent(component,event,helper);
    },
    getRecord: function(component,event,helper){
     	helper.getRecordDetails(component,event,helper);
    },
    saveWebinar: function(component,event,helper){
        console.log('in saveWebinar>>');
     	helper.saveWebinarDetails(component,event,helper);
    }
    
})