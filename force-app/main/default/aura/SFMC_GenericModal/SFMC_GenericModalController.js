({
	hideModal : function(component, event, helper) {
        console.log('In hide modal>>');
		var sfmccomponentevent = cmp.getEvent("SFMC_Component_Event");
        sfmccomponentevent.setParams({
            "showModal" : false 
        });
        sfmccomponentevent.fire();
	}
})