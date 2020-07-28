({
    changePhoneNumber : function(component, event, helper){
        var currentNumber = component.get("v.FormSubmissionRecord.Phone__c");
        if(currentNumber){
            currentNumber = currentNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            component.set("v.FormSubmissionRecord.Phone__c",currentNumber);
            var phoneField = event.getSource();
            phoneField.setCustomValidity('');
            phoneField.reportValidity(); 
            var phoneLength = phoneField.get('v.value').length;
            if(phoneLength < 10 && phoneLength != 0){
                var errorLabel = $A.get("$Label.c.Phone_number_too_short");
                phoneField.setCustomValidity(errorLabel);
                phoneField.reportValidity();
                return;
            }
            if(phoneLength == 10){
                phoneField.setCustomValidity('');
                phoneField.reportValidity();
            }  
        }
        
    },
    
    //----------------------------------------------------------------//
    addWalkInRegistant: function(component, event, helper)
    {
        component.set('v.showSpinner',true);
        var formsubrec=component.get("v.FormSubmissionRecord");
        var campid=component.get("v.campid");
        var evtid=component.get("v.Eventid");
        var action = component.get("c.addWalkInRegistrantation");
        action.setParams({
            formSubRec: formsubrec,
            campId: campid,
            evtId: evtid
        });
        var self = this;
        action.setCallback(this, function(actionResult) {
            var TotalReg=actionResult.getReturnValue();
            var state = actionResult.getReturnValue();
            var total=JSON.stringify(TotalReg);
            if(state)
            {
                this.showSuccessToast(component,event,helper);  
                component.set('v.showSpinner',false);
                component.set("v.FormSubmissionRecord",{'sobjectType': 'Form_Submission__c',
                                                        'First_Name__c':'',
                                                        'Email__c':'',
                                                        'Last_Name__c':'',
                                                        'State__c':'',
                                                        'Phone__c':'',
                                                        'Zip_Code__c':'',
                                                        'City__c':''
                                                       });
                
            }
            
            else
            {
				this.showErrorToast(component,event,helper);
                component.set('v.showSpinner',false);
                component.set("v.FormSubmissionRecord",{'sobjectType': 'Form_Submission__c',
                                                        'First_Name__c':'',
                                                        'Email__c':'',
                                                        'Last_Name__c':'',
                                                        'State__c':'',
                                                        'Phone__c':'',
                                                        'Zip_Code__c':'',
                                                        'City__c':''
                                                       });
            }
            
            
        });
        $A.enqueueAction(action);
        
    },
    
   //----------------------------------------------------------------//
    getRegistrantsList: function(component, event, helper) {
        var  campid = component.get("v.campid");
        var  evtid = component.get("v.Eventid");
        var action = component.get("c.getAllEventMembers");
        action.setParams({
            evtId: evtid 
            
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
            component.set("v.Registrants", TotalReg);
            
        });
        $A.enqueueAction(action);
    },
    
    
   
    
    //--------------------------------//
    CSV2JSON: function (component,csv) {
        var arr = []; 
        arr =  csv.split('\n');
        arr.pop();
        var jsonObj = [];
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
            var data = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
                }
            jsonObj.push(obj);
        }
        var json = JSON.stringify(jsonObj);
        return json;
        },
    
   
    //-----------------------------------------------------//
    getCampMemStatusList: function(component, event, helper) {
        var action = component.get("c.getCampMemberStatusPicklist");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.CampMemberStatusList", response.getReturnValue());
                
            }
        });
        $A.enqueueAction(action);
    },
    
    //-------------------------------------------------------//
    getUpdateOnChangeStatus: function(component, event, helper) 
    {
        var CampMemStatus = event.target.getElementsByClassName("Registrants-Id")[0].value;
        var  campid = component.get("v.campid");
        var  evtid = component.get("v.Eventid");
        var value = event.getSource().get("v.value");
        component.set('v.showSpinner',true);
        var action = component.get("c.updateEventMemberStatus");
        action.setParams({
            "evtMemberId" :CampMemStatus,
            "updateStatus":value,
            "campId" :campid
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {  
                component.set('v.showSpinner',false);
                this.statusChangeSuccessToast(component,event,helper);
            }
            else 
            {
                component.set('v.showSpinner',false);
                this.statusChangeErrorToast(component,event,helper);  
            }
            
        }); 
        
        $A.enqueueAction(action);  
        component.updateRegistrantsList();
    },
    
    //----------------------------------------------------------//
    convertArrayOfObjectsToCSV : function(component,objectRecords){
        
        var csvStringResult, counter, keys, columnDivider, lineDivider;
        if (objectRecords == null || !objectRecords.length) {
            return null;
        }
        columnDivider = ',';
        lineDivider =  '\n';
        keys = ['Id','First_Name__c','Last_Name__c','Email__c','Mobile_Phone__c','Registration_Type__c','Status__c','Query_String_Parameters__c'];
        
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
                
                var result = value;
                if(skey == 'Query_String_Parameters__c'){
                    result = value.split('"').join('');                
                    result = '"' + result + '"';
                }
                
                csvStringResult +=result; 
                counter++;
            } 
            csvStringResult += lineDivider;
            
        }
        return csvStringResult;        
    },
    
    //----------------------------------------------------------//
    getFormSubStatePicklistValues: function(component, event, helper) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            objName: 'Form_Submission__c',
            fldName: 'State__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();   
            if (state === "SUCCESS") {
                component.set("v.StateList", response.getReturnValue());
                
            }
        });
        $A.enqueueAction(action);
    },
    
    showSuccessToast : function(component, event, helper) {
        
        var successLabel = $A.get("$Label.c.SFMC_Success_Walk_In");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": successLabel,
            "type": "success"
        });
        toastEvent.fire();
    },
    
    showErrorToast : function(component, event, helper) {
        
        var failedLabel = $A.get("$Label.c.SFMC_RegistrantsFailedMessage"); 
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error!",
            "message": failedLabel,
            "type": "error"
        });
        toastEvent.fire();
    },
    
    statusChangeSuccessToast : function(component, event, helper) {
       
        var successLabel = $A.get("$Label.c.SFMC_CampMemberStatusUpdate");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": successLabel,
            "type": "success"
        });
        toastEvent.fire();
    },
    
    statusChangeErrorToast : function(component, event, helper) {
       
        var failedLabel = $A.get("$Label.c.SFMC_UpdateStatusFailed");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error!",
            "message": failedLabel,
            "type": "error"
        });
        toastEvent.fire();
    },


})