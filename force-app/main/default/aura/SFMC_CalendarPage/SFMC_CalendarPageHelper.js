({
  
    loadDataToCalendar :function(component,data){  
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
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            selectable : true,
            selectHelper: true,
            defaultDate: currentDate, 
            editable: false,
            eventLimit: true,
            events:data,
            dragScroll : true,
            droppable: true,
           //eventBackgroundColor:'#EA0029',
           //eventBorderColor:'#EE0000',
            aspectRatio: 0.5,
            contentHeight:766, 
            buttonText: {
                prev : 'Previous',
                next : 'Next'
            },
            eventRender: function(events, element) {
                if (events.type === "Event") {
                  element.css({
                      'background-color': 'orange',
                      'border-color': 'orange'
                    });
                        
                   }
                else if(events.type==='Webinar')
                {
                    element.css({
                        
                        'background-color': '#EA0029',
                        'border-color': '#EE0000'
                    });
                }
            },
            
           eventClick: function(events) {
               
               if (events.type === "Event")
               {
                    window.open(events.registrationPageUrl);
                   
               }
               else if(events.type==='Webinar')
               {
                   window.open(events.registrationUrl);
               }                
            },
            
            eventMouseover: function(events) {
                var tooltip = '<div class="tooltipevent" style="width:160px;height:auto;background:#000000;color:white !important;font-size:15px; border-radius:5px;position:absolute;z-index:10001; padding:5px;">' + events.title + '</div>';
                var $tooltip = $(tooltip).appendTo('body');
            
                $(this).mouseover(function(e) {
                    $(this).css('z-index', 10000);
                    $tooltip.fadeIn('500');
                    $tooltip.fadeTo('10', 1.9);
                }).mousemove(function(e) {
                    $tooltip.css('top', e.pageY + 15);
                    $tooltip.css('left', e.pageX -150);
                });
            },
            
            eventMouseout: function(calEvent, jsEvent) {
                $(this).css('z-index', 8);
                $('.tooltipevent').remove();
            },
       
        });     
    },
    
    //------------------------------------------------//
    formatFullCalendarData : function(component,events) {
        var josnDataArray = [];
        var d = new Date();
        var timezone = $A.get("$Locale.timezone");
        for(var i = 0;i < events.length;i++){
            //var startdate = $A.localizationService.formatDateTime(events[i].Start_Date_Time__c);
            //var enddate = $A.localizationService.formatDateTime(events[i].End_Date_Time__c);
            var startdate = new Date(events[i].Start_Date_Time__c).toLocaleString("en-US", {timeZone: timezone},{hour12:true})
            var enddate = new Date(events[i].End_Date_Time__c).toLocaleString("en-US", {timeZone: timezone})
             josnDataArray.push({
                'title':events[i].Name__c,
                'start':startdate,
                'end':enddate,
                'id':events[i].Id,
                'type':events[i].Type__c,
                'registrationPageUrl':events[i].Registration_Page_Url__c,
                'registrationUrl':events[i].Registration_Url__c
            });
        }
         return josnDataArray;
    },
    
    //-----------------------------------------------//
    fetchCalenderEvents : function(component) {
        var action=component.get("c.getAllEventsrec");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data= response.getReturnValue();
                var josnArr = this.formatFullCalendarData(component,response.getReturnValue());
                this.loadDataToCalendar(component,josnArr);
                component.set("v.Objectlist",josnArr); 
            } 
        });
        
        $A.enqueueAction(action);
    },     
})