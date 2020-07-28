({
  //===========================================================================================//
  getEventList: function(component) {
    var action = component.get("c.getAllEvents");
    // Set up the callback
    var self = this;
    action.setCallback(this, function(actionResult) {
      component.set("v.Events", actionResult.getReturnValue());
    });
    $A.enqueueAction(action);
  },

  //===========================================================================================//
  fetchactiveuserlist: function(component, event, helper) {
    var action = component.get("c.getusers");
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        component.set("v.usersList", response.getReturnValue());
        console.log(response.getReturnValue());
      }
    });
    $A.enqueueAction(action);
  },

  //===========================================================================================//
  fetchoptionlist: function(component, event, helper) {
    var action = component.get("c.getoptionPicklist");
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        component.set("v.PublicEvent", response.getReturnValue());
        console.log(response.getReturnValue());
      }
    });
    $A.enqueueAction(action);
  },

  //===========================================================================================//
  validateForm: function(component, event, helper) {
    var validField = true;
    var getName = component.find("Name").get("v.value");
    var getCustomer = component.find("campName").get("v.value");
    if (getName == "" || getCustomer == "") {
      validField = false;
      alert("Required fields are missing");
      return validField;
    } else {
      return validField;
    }
  }
});