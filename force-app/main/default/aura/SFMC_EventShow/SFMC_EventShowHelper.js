({
	 fetchCalenderEvents : function(component) {
         var action=component.get("c.getAllEvents");
       
         action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data= response.getReturnValue();
               console.log('data'+data);
               
               var josnArr = this.formatFullCalendarData(component,response.getReturnValue());
                var m = JSON.stringify(josnArr);
                console.log('gd'+m);
                //this.loadDataToCalendar(component,josnArr);
                component.set("v.Objectlist",data);
           
            } else if (state === "ERROR") {
                                 
            }
        });
        
        $A.enqueueAction(action);
       
    }, 
     formatFullCalendarData : function(component,events) {
        var josnDataArray = [];
        for(var i = 0;i < events.length;i++){
            var startdate = $A.localizationService.formatDate(events[i].StartDateTime);
            var enddate = $A.localizationService.formatDate(events[i].EndDateTime);
            josnDataArray.push({
                'title':events[i].Subject,
                'start':startdate,
                'end':enddate,
                'id':events[i].Id
            });
        }
      
        return josnDataArray;
    },

})