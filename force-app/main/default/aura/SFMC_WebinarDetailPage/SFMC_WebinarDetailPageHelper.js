({
	getData : function(component,event,helper) {
        console.log('getData>>');
		var action = component.get("c.getPageData");
        action.setCallback(this,function(response){
        var state = response.getState();
        console.log('in callback>>state>>',state);
        if(state=='SUCCESS')
        {
            var josnArr = this.formatEventsData(response.getReturnValue());
        	component.set("v.webinarData",josnArr);
            console.log('Webinar data>>',component.get("v.webinarData"));
        }
        else if(state=='ERROR')
        {
        	console.log('Error>>',response.getError());                
        }
     });
     $A.enqueueAction(action);
	},
    
     formatEventsData : function(events) {
        
        var startdate  = new Date();
        var enddate  = new Date();
        var timezone = $A.get("$Locale.timezone");
        for(var i = 0;i < events.length;i++){
            startdate = new Date(events[i].Start_Date_Time__c).toLocaleString("en-US", {timeZone: timezone},{hour12:true})
            enddate = new Date(events[i].End_Date_Time__c).toLocaleString("en-US", {timeZone: timezone})
            startdate= $A.localizationService.formatDate(startdate, "yyyy-MM-dd  HH:mm:ss");
            enddate=$A.localizationService.formatDate(enddate, "yyyy-MM-dd  HH:mm:ss");
            events[i].Start_Date_Time__c=startdate;
            events[i].End_Date_Time__c =enddate;
        }
        return events;
    },
})