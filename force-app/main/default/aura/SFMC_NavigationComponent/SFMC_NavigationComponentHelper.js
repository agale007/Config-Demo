({
    getusername : function(component, event, helper) 
    {
        var  action = component.get("c.getCurrentUserName");
        action.setCallback(this, function(actionResult) {
            var usernames=actionResult.getReturnValue();
            component.set("v.username",usernames);
        });
        $A.enqueueAction(action);
    },
    
})