({
    doInit: function(component, event, helper) {
        // Fetch the account list from the Apex controller
        helper.getEventList(component);
    },
    deleteEvent: function(component, event, helper) {
        // Prevent the form from getting submitted
        console.log('call');
        event.preventDefault();
        // Get the value from the field that's in the form
        var EventName = event.target.getElementsByClassName('Event-name')[0].value;
        confirm('Delete the ' + EventName + ' account? (don’t worry, this won’t actually work!)');
    },
     addevent: function(component, event, helper) {
        // Pop up Add new Event UI
         component.set("v.isOpen",true);
        
    },
     cancel: function(cmp,evt,helper){
         
          cmp.set("v.isOpen",false);
        
    },
})