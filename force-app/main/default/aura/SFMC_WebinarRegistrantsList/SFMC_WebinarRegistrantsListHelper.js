({
	getRegistrantsList : function(component, event) {
        component.set('v.showSpinner',true);
		var webinarkey = component.get("v.webinarkey");
        console.log("WebinarKey : "+ webinarkey);
        var webinarID = component.get("v.webinarId");
        console.log("WebinarKey : "+ webinarID);
        
        var action = component.get("c.getWebinarRegistarantList");
        action.setParams({
            "webKey": webinarkey
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log('Responce from Server : '+ state);
            if(state=='SUCCESS')
            {  
            var TotalReg = response.getReturnValue()
            var total=JSON.stringify(TotalReg);
            //var Sentcount=0;
            var AttendedCount=0;
            var Registeredcount=0;
            var currentSts = [];
            for (var i = 0; i < TotalReg.length; i++) {
                if(TotalReg[i].Status__c ==='Registered')
                {
                    Registeredcount=Registeredcount+1;
                }
                else if(TotalReg[i].Status__c ==='Attended')
                {
                    AttendedCount=AttendedCount+1;
                }
                
            }
                component.set("v.TotalReg",Registeredcount);
                component.set("v.TotalAtten",AttendedCount);
                component.set('v.showSpinner',false);
                component.set("v.activeRegistarents",response.getReturnValue());
                component.set("v.allRegistarents",response.getReturnValue());
                console.log('Response Data : ', response.getReturnValue());
            }
            else if(state=='ERROR')
            {
				console.log('Error>>',response.getError());                
            }
        });
        $A.enqueueAction(action);
	},
    
    getRegistrantsListByLastName: function(component, event) {
        var searchKey=event.getSource().get("v.label");
        component.set('v.showSpinner',true);
		var webinarkey = component.get("v.webinarkey");
        console.log("WebinarKey : "+ webinarkey);
        var webinarID = component.get("v.webinarId");
        console.log("WebinarKey : "+ webinarID);
        
        var action = component.get("c.getWebinarRegistarantListByLastName");
        action.setParams({
            "webKey": webinarkey,
            "Keyword": searchKey
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log('Responce from Server : '+ state);
            if(state=='SUCCESS')
            {  
            var TotalReg = response.getReturnValue()
            var total=JSON.stringify(TotalReg);
            //var Sentcount=0;
            var AttendedCount=0;
            var Registeredcount=0;
            var currentSts = [];
            for (var i = 0; i < TotalReg.length; i++) {
                if(TotalReg[i].Status__c ==='Registered')
                {
                    Registeredcount=Registeredcount+1;
                }
                else if(TotalReg[i].Status__c ==='Attended')
                {
                    AttendedCount=AttendedCount+1;
                }
                
            }
                
                component.set("v.TotalReg",Registeredcount);
                component.set("v.TotalAtten",AttendedCount);
                component.set('v.showSpinner',false);
                component.set('v.filterSelector',searchKey);
                component.set("v.activeRegistarents",response.getReturnValue());
                console.log('Response Data : ', response.getReturnValue());
            }
            else if(state=='ERROR')
            {
				console.log('Error>>',response.getError());                
            }
        });
        $A.enqueueAction(action);
	},
    
    exportToCSV : function(component,objectRecords){
        var csvStringResult, counter, keys, columnDivider, lineDivider;
        if (objectRecords == null || !objectRecords.length) {
            return null;
        }
        columnDivider = ',';
        lineDivider =  '\n';
        keys = ['Id','First_Name__c','Last_Name__c','Email__c','Status__c','SurveyResponse1__c','SurveyResponse2__c','SurveyResponse3__c','SurveyResponse4__c','SurveyResponse5__c'];
        
        csvStringResult = '';
        csvStringResult += keys.join(columnDivider);
        csvStringResult += lineDivider;
        for(var i=0; i < objectRecords.length; i++){   
            counter = 0;
            for(var sTempkey in keys) {
                var skey = keys[sTempkey] ;  
                if(counter > 0){ 
                    csvStringResult += columnDivider; 
                }   
                var value = objectRecords[i][skey] === undefined ? '' : objectRecords[i][skey];
                csvStringResult += '"'+ value +'"'; 
                counter++;
            } 
            csvStringResult += lineDivider;
        }
        return csvStringResult;        
    },
})