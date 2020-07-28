({
	initData : function(component,event,helper) {
		var action = component.get("c.getDocumentIdByDocumentName");
        action.setParams({
            "developerName" : "Relator_com_Results_Logo"
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state=="SUCCESS")
            {
                var responseWrapper = JSON.parse(response.getReturnValue());
                component.set("v.documentId",responseWrapper.documentId);
                component.set("v.showHeader",true);
            }
            console.log('documentId>>',component.get("v.documentId"));
        });
	
    	$A.enqueueAction(action);
    }
})