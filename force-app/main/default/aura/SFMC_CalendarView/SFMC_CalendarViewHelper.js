({
	loadDataToCalendar :function(component,data){  
        //Find Current date for default date
        
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var currentDate = d.getFullYear() + '/' +
            (month<10 ? '0' : '') + month + '/' +
            (day<10 ? '0' : '') + day;
         
        var self = this;
        
            
        $('#calendar').fullCalendar({
            
            header: {
                left: 'today,prev,next',
                center: 'title',
                right: 'month,basicWeek,basicDay,list'
            },
            selectable : true,
            selectHelper: true,
            defaultDate: currentDate,
            editable: true,
            eventLimit: true,
            events:data,
            dragScroll : true,
            droppable: true,
            eventBackgroundColor:'#EA0029',
            eventBorderColor:'#EA0029',
             aspectRatio: 0.5,
             contentHeight:766,
            
            buttonText: {
                prev : 'Previous',
                next : 'Next'
            },
            	
 
          eventClick: function(event) {
      console.log('https://lghtningapp-dev-ed.lightning.force.com/lightning/r/Event/'+event.id+'/view');
      window.open("https://lghtningapp-dev-ed.lightning.force.com/lightning/r/Event/"+event.id+"/view");
     
    }
  
         
            

    });
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
     
    fetchCalenderEvents : function(component) {
         var action=component.get("c.getAllEvents");
       
         action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data= response.getReturnValue();
               
                 var josnArr = this.formatFullCalendarData(component,response.getReturnValue());
                this.loadDataToCalendar(component,josnArr);
                component.set("v.Objectlist",josnArr);
           
            } else if (state === "ERROR") {
                                 
            }
        });
        
        $A.enqueueAction(action);
       
    }, 
    
   
     
})