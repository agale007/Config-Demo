({
	doInit : function(component, event, helper) {
        var prefixString = $A.get('$Resource.OpcityContents') + '/assets/images/';
        component.set('v.prefixString', prefixString);
    }
})