({
	changePhoneNumber : function(component, event, helper){
        var currentNumber = component.get("v.formSubmissionObj.Phone__c");
        if(currentNumber){
          	currentNumber = currentNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            component.set("v.formSubmissionObj.Phone__c",currentNumber);
            
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
    
    prepareTemplate: function(component,event,helper){
        component.find("formSubmissionRecordCreator").getNewRecord(
            "Form_Submission__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newFSRecord");
                var error = component.get("v.fSError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }else{
                    helper.setDefaultValues(component,event,helper);
                }
            })
        );
    },
    
    setDefaultValues: function(component,event,helper){
        
        var vars = {};
        var pageURL = window.location.href;
        var path = window.location.pathname;
        var parts = pageURL.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        component.set('v.urlParamMap',vars);
        var pageName = path.split('/')[1];
        var dynamicBu = 'https://'+window.location.hostname+'/'+pageName;
        
        var productTypeDecode = $A.util.isEmpty(vars.product_type) ? vars.product_type : decodeURIComponent((vars.product_type + '').replace(/\+/g, '%20'));
        var campaignIdDecode = $A.util.isEmpty(vars.utm_campaign_id) ? vars.utm_campaign_id : decodeURIComponent((vars.utm_campaign_id + '').replace(/\+/g, '%20'));
        var mediumDecode = $A.util.isEmpty(vars.utm_medium) ? vars.utm_medium : decodeURIComponent((vars.utm_medium + '').replace(/\+/g, '%20'));
        var contentDecode = $A.util.isEmpty(vars.utm_content) ? vars.utm_content : decodeURIComponent((vars.utm_content + '').replace(/\+/g, '%20'));
        var sourceDecode = $A.util.isEmpty(vars.utm_source) ? vars.utm_source : decodeURIComponent((vars.utm_source + '').replace(/\+/g, '%20'));
        var leadOrignDecode = $A.util.isEmpty(vars.lead_orign) ? vars.lead_orign : decodeURIComponent((vars.lead_orign + '').replace(/\+/g, '%20'));
        var gclIdVar = $A.util.isEmpty(vars.gclid) ? vars.gclid : decodeURIComponent((vars.gclid + '').replace(/\+/g, '%20'));
        
        var getSubmissionType = component.get('v.submissionType');
        var getProductType =  component.get('v.productType');
        var getCampignId = component.get('v.campaignId');
        
        if(!$A.util.isEmpty(productTypeDecode)){
            getProductType = productTypeDecode
        }
        if(!$A.util.isEmpty(campaignIdDecode)){
            getCampignId = campaignIdDecode
        }
        component.set('v.formSubmissionObj.Product_Type__c',getProductType);
        component.set('v.formSubmissionObj.Campaign_Id__c',getCampignId);
        component.set('v.formSubmissionObj.Form_Type__c',getSubmissionType);
        
        if(!$A.util.isEmpty(sourceDecode)){
            component.set('v.formSubmissionObj.Source__c',sourceDecode);
        }
        if(!$A.util.isEmpty(gclIdVar)){
             component.set('v.formSubmissionObj.GCLID__c',sourceDecode);
        }
         //component.set('v.formSubmissionObj.Medium__c',mediumDecode);
        if(!$A.util.isEmpty(mediumDecode)){
            component.set('v.formSubmissionObj.Medium__c',mediumDecode);
        }
        if(!$A.util.isEmpty(contentDecode)){
            component.set('v.formSubmissionObj.UTM_Content__c',contentDecode);
        }
        if(!$A.util.isEmpty(leadOrignDecode)){
            component.set('v.formSubmissionObj.Lead_Origin__c',leadOrignDecode);
        }
        component.set('v.formSubmissionObj.URL__c',pageURL.split('?')[0]);
        
        var action1 = component.get('c.getPicklistValues');
        
        action1.setParams({
                cmId : vars.contactMethodId
            });
        
        action1.setCallback(this, function(data){
            if (data.getState() === "SUCCESS") {
                var picklistValueMap = data.getReturnValue();
                helper.populateValuesOnForm(component,picklistValueMap, pageURL, vars); 
                
            }else if (data.getState() === "ERROR"){
                var errors = data.getError();
                console.log('errors = ' +errors);
                if (errors) {
                    for(var i=0; i < errors.length; i++) {
                        console.log('page errors = ' +errors[i].pageErrors );
                        console.log('page errors = ' +errors[i].fieldErrors );
                        console.log('message errors = ' +errors[i].message );
                    }
                }
            }
        });
        
        var action2 = component.get('c.getPicklistStateValues');
        action2.setCallback(this, function(data){
            if (data.getState() === "SUCCESS") {
                var picklistString = data.getReturnValue();
                helper.populateStates(component,picklistString); 
                
            }else if (data.getState() === "ERROR"){
                var errors = data.getError();
                console.log('errors = ' +errors);
                if (errors) {
                    for(var i=0; i < errors.length; i++) {
                        console.log('page errors = ' +errors[i].pageErrors );
                        console.log('page errors = ' +errors[i].fieldErrors );
                        console.log('message errors = ' +errors[i].message );
                    }
                }
            }
        });
        
        var action3 = component.get('c.getPicklistCompanyTypeValues');
        action3.setCallback(this, function(data){
            if (data.getState() === "SUCCESS") {
                var picklistString = data.getReturnValue();
                helper.populateCompanyType(component,picklistString); 
                
            }else if (data.getState() === "ERROR"){
                var errors = data.getError();
                console.log('errors = ' +errors);
                if (errors) {
                    for(var i=0; i < errors.length; i++) {
                        console.log('page errors = ' +errors[i].pageErrors );
                        console.log('page errors = ' +errors[i].fieldErrors );
                        console.log('message errors = ' +errors[i].message );
                    }
                }
            }
        });
        
        $A.enqueueAction(action2);
        $A.enqueueAction(action3);
        $A.enqueueAction(action1);
       
    },
    
    //Populate company type picklist on form
     populateCompanyType: function(component,picklistString){
        component.set('v.companyTypeMap',JSON.parse(picklistString));
    },
    
 	//Populate state picklist on form
     populateStates: function(component,picklistString){
        component.set('v.stateMap',JSON.parse(picklistString));
    },
 	//Set default values on form
    populateValuesOnForm: function(component,picklistValueMap, pageURL, urlParam){
        var simpleNewFormSubmission = JSON.parse(JSON.stringify(component.get('v.formSubmissionObj')));
        simpleNewFormSubmission.Email__c = picklistValueMap['Email__c'];
        simpleNewFormSubmission.First_Name__c = picklistValueMap['First_Name__c'];
        simpleNewFormSubmission.Last_Name__c = picklistValueMap['Last_Name__c'];
        simpleNewFormSubmission.Phone__c = picklistValueMap['Phone__c'];
        
        var path = window.location.pathname;
        var page = path.split('/')[1];
        var dynamicBu = 'https://'+window.location.hostname+'/'+page;
        
        //Set business unit value
        if(picklistValueMap[dynamicBu] != null){
            simpleNewFormSubmission.Business_Unit__c = picklistValueMap[dynamicBu];
        }
        else if(picklistValueMap[pageURL.split('/')[2]] != null){
            simpleNewFormSubmission.Business_Unit__c = picklistValueMap[pageURL.split('/')[2]];
        }
        
        component.set('v.formSubmissionObj', simpleNewFormSubmission);
        //simpleNewFormSubmission.URL__c = pageURL.split('?')[0];
        /*component.set('v.formSubmissionObj', picklistValueMap['Email__c']);
        component.set('v.formSubmissionObj', picklistValueMap['First_Name__c']);
        component.set('v.formSubmissionObj', picklistValueMap['Last_Name__c']);
        component.set('v.formSubmissionObj', picklistValueMap['Phone__c']);*/
    },
    
    /*fetchPickListVal: function(component, fieldName) {
        var action = component.get("c.getselectOptions");
        action.setParams({
            "objObject": component.get('v.objInfo'),
            "fld": fieldName
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
 
                if (allValues != undefined && allValues.length > 0) {
                    opts.push({
                        class: "optionClass",
                        label: "--- None ---",
                        value: ""
                    });
                }
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.options", allValues);
            }
        });
        $A.enqueueAction(action);
    },*/
})