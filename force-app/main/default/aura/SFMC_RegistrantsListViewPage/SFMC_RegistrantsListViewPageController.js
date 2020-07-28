({
    
    doInit: function(component, event, helper) {
        helper.getRegistrantsList(component, event, helper);
        helper.getFormSubStatePicklistValues(component, event, helper);
        component.set('v.filterSelector','ALL');
    },
    
    changePhoneNumber : function (component, event, helper) {  
        helper.changePhoneNumber(component, event, helper);
    },
    
    walkInRegistration: function(component, event, helper) 
    {
        var validExpense = component.find('formfields').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            var name = inputCmp.get('v.name');
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        if(validExpense){
            helper.addWalkInRegistant(component, event, helper);
        }
    },
    
    onChangeStatus: function(component, event, helper) 
    {
        helper.getUpdateOnChangeStatus(component, event, helper);
    },
    
    getEventMembers : function(component, event, helper) {
        var labelname=event.getSource().get("v.label");
        var  evtid = component.get("v.Eventid");
        var  action = component.get("c.serchEventMemberData");
        action.setParams({
            searchKey: labelname,
            evtId:evtid
            
        });
        var self = this;
        action.setCallback(this, function(actionResult) {
            var TotalReg=actionResult.getReturnValue();
            var AttendedCount=0;
            var Registeredcount=0;
            for (var i = 0; i < TotalReg.length; i++) {
            
                 if(TotalReg[i].Status__c ==='Registered')
                {
                    Registeredcount=Registeredcount+1;
                    TotalReg[i].statusList = ['Registered','Attended'];
                    
                }
                else if(TotalReg[i].Status__c ==='Attended')
                    {
                        AttendedCount=AttendedCount+1;
                        TotalReg[i].statusList = ['Attended'];
                        }
                }
            
            component.set("v.TotalReg", Registeredcount);
            component.set("v.TotalAtten", AttendedCount);
            component.set("v.Registrants", actionResult.getReturnValue());
            component.set('v.filterSelector',labelname);
        });
        $A.enqueueAction(action);
    },
    
    addRegistrants : function(component, event, helper) {
        component.set("v.displayedSection","section2");
        },
    
    registrationlisting : function(component, event, helper) {
        component.set('v.isMessage',false);
        component.set("v.Message","");
        component.set('v.isFailed',false);
        component.set("v.Message","");
        component.updateRegistrantsList();
        component.set("v.displayedSection","section1");
        
        
        },
    
    exportRecord : function(component,event,helper)
    {
        var stockData = component.get("v.Registrants");
        var campid = component.get("v.campid");
        var campName = component.get("v.campName");
        var csv = helper.convertArrayOfObjectsToCSV(component,stockData);   
        if (csv == null){return;} 
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_self';
        hiddenElement.download = campName+'.csv';  
        document.body.appendChild(hiddenElement); 
        hiddenElement.click(); 
    }, 
    
    
    clearMsg : function(component,event,helper){
        component.set('v.isMessage',false);
        component.set("v.Message","");
        component.set('v.isFailed',false);
        component.set("v.Message","");
        
        
    },
    
})