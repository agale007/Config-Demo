({
    // Fetch the accounts from the Apex controller
    getEventList: function(component) {
        var action = component.get('c.getAllEvents');
        // Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set('v.Events', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})