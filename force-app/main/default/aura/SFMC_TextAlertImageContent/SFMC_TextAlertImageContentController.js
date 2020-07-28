({
	doInit : function(component, event, helper) {
        var prefixString = $A.get('$Resource.TextAlertImages') + '/assets/images/';
        component.set('v.prefixString', prefixString);
    }
})