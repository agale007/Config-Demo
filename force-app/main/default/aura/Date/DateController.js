({
	doInit : function(component, event, helper) {
      var action = component.get("c.getEventID");
	  var pageURL = window.location.href;
        var mapS = {};
      var parts = pageURL.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      mapS[key] = value;
      component.set('v.urlParamMap', mapS.id);
     });
        
        action.setParams({
            urlParamMap:mapS.id 
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state=="SUCCESS"){
                var dateValue = response.getReturnValue();
                console.log(dateValue);
                component.set("v.event", dateValue.Webinar_Date__c);
                //var htmlString = "<div class='p'>Hello</div>";
                component.set("v.htmlString", dateValue.Description__c);
            }
        })
     $A.enqueueAction(action);  
	}
})