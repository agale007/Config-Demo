({
	onSearch : function(component, event, helper) {
		var action = component.get("c.serchInventoryData");
        action.setParams({
            'searchKey': component.get("v.searchKeyword")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS"){
                component.set("v.searchResult",response.getReturnValue());
            }
	   })
     $A.enqueueAction(action);
   }
})