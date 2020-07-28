public with sharing class ScheduleAppointmentHelper {
    
    public static Slot checkSlot(){
        Slot wrapperObj = new Slot();
        //Configuring end point
        String endpoint='callout:fhir/Slot';
        //String endpoint = 'http://fhirtest.uhn.ca/baseDstu3/Slot';
        System.debug('Endpoint url>>'+endpoint);      
        
        //Configuring method
        String method='GET';  
        
        //preparing header map
        map<String,String> headerMap = new map<String,String>();
        headerMap.put('Accept', 'application/json');
        
        //Forming HTTP request to be sent for an API call
        HTTPRequest req = Utility.formRequest(endpoint,method,'',headerMap);
        
        System.debug('req == '+ req);

        //Hitting the request to end URL and stroring response
        HTTPResponse response  = Utility.sendRequest(req);
        if(response.getStatusCode()==200)
        {
            System.debug('-->> response Body = ' + response.getBody());
            String responseBody = response.getBody();
            responseBody = responseBody.replace('end','endtime');
            wrapperObj = (Slot)JSON.deserialize(responseBody,Slot.class);
            System.debug('wrapperObj = ' + wrapperObj.entry );
        }else{
            System.debug('Error while calling webservice');
        }
        return wrapperObj;        
    }
    /*@AuraEnabled public static List<SlotAvailable> getSlotAvailable(){
        return getSlotAvailable(null,null);
    }*/
    @AuraEnabled public static List<SlotAvailable> getSlotAvailable(DateTime currentStartTime, DateTime currentEndTime){
        List<SlotAvailable> availableSlot = new List<SlotAvailable>();
        Slot wrapperObj = checkSlot();
        if(wrapperObj != null){
            List<Entry> entrylist = wrapperObj.entry;
            if(entrylist != null){
                for(Entry entryobj : entrylist){                    
                    if(entryobj.resource.status == 'free'){                        
                        if(entryobj.resource.start != null && entryobj.resource.endtime != null){                            
                            String startDateStr = entryobj.resource.start.replace('T',' ');
                            system.debug(' before startDateStr = '+ startDateStr);
                            
                            DateTime startDate = DateTime.valueOf(startDateStr);
                            String endDateStr = entryobj.resource.endtime.replace('T',' ');
                            system.debug(' before endDateStr = '+ endDateStr);
                            DateTime endDate = DateTime.valueOf(endDateStr);                            
                            
                            if(startDate > Datetime.now()){
                                system.debug('startDate = '+ startDate);
                                system.debug('currentStartTime = '+ currentStartTime);
                                if((currentStartTime == null || currentStartTime != startDate) ){
                                    SlotAvailable slotObj = new SlotAvailable();                                    
                                    slotObj.startTime = startDate;
                                    slotObj.endTime = endDate.addHours(1);
                                    availableSlot.add(slotObj);
                                }
                            }
                        }                        
                    }
                }
            }
        }
        System.debug('availableSlot = '+availableSlot);
        return availableSlot;
    }

    public class Slot{
        public  String resourceType;
        public  String id;
        public  Meta meta;
        public  String type;
        public  Integer total;
        public  List<Link> link;
        public  List<Entry> entry;
    }
    public class Meta{
        public  String lastUpdated;
    }
    public class Link{
        public  String relation;
        public  String URL;
    }
    public class Entry{
        public  String fullUrl;
        public Resource resource;
    }
    public class Resource{
        public  String status;
        public  String start;
        public  String endtime;
    }
}