({
  getSlotAvailable: function(cmp, evt, hlp) {
    cmp.set('v.loading',true);
    var action = cmp.get("c.getSlotAvailable");
    action.setParams({ currentStartTime: null, currentEndTime: null });
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        //let result = JSON.parse(response.getReturnValue());
        //console.log(result);

        let slots = [
          {
            startTime: "1 PM",
            endTime: "2 PM",
            slotDate: "05-Feb-2020",
            id: "82"
          },
          {
            startTime: "2 PM",
            endTime: "3 PM",
            slotDate: "05-Feb-2020",
            id: "83"
          },
          {
            startTime: "3 PM",
            endTime: "4 PM",
            slotDate: "05-Feb-2020",
            id: "84"
          }
        ];

        cmp.set("v.slots", slots);
        $A.util.removeClass(cmp.find('slots'),'slds-hide');
      } else if (state === "ERROR") {
        console.log("Could not get Specialist");
      }
      cmp.set('v.loading',false);
    });
    $A.enqueueAction(action);
  }
});