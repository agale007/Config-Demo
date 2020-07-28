({
    doInit : function(component, event, helper) {
        var brandType = component.get("v.brandType");
        var brandTopProducer = $A.get("$Label.c.SFMC_Brand_Top_Producer");
        var brandRDC = $A.get("$Label.c.SFMC_Brand_RDC");
        var brandEvents = $A.get("$Label.c.SFMC_Brand_Events");
        var conMethodId = component.get("v.contactMethodId");
        var userType = component.get("v.userType");
        console.log('user>>',userType);
        
        if(brandType == brandTopProducer){            
            component.set('v.brandName','Top Producer');
        }else if(brandType == brandRDC){            
            component.set('v.brandName','realtor.com');
        }
        
            else{
                component.set('v.contactMethodIdErrorMsg',$A.get("$Label.c.Invalid_record_in_preference_center_UI"));
                component.set('v.contactMethodIdError',false);
            }
        if(conMethodId==null){ 
            var optInForInformational = component.find("optInForInformational");
            var optInForPromotional = component.find("optInForPromotional");
            var optInForEvents = component.find("optInForEvents");
            optInForInformational.set("v.value",true);
            optInForPromotional.set("v.value",true);
            optInForEvents.set("v.value",true);
            
        }
        var action = component.get('c.getPreferenceRecord');
        action.setParams({
            contactMethodId : component.get('v.contactMethodId')
        });
        
        
        action.setCallback(this, function(data){            
            console.log('data.getState() = ' + data.getState());
            if (data.getState() === "SUCCESS") {
                var record = data.getReturnValue();
                
                if(record == null){
                    component.set('v.contactMethodIdErrorMsg',$A.get("$Label.c.Invalid_record_in_preference_center_UI"));
                    component.set('v.contactMethodIdError',false);
                    component.set('v.contactMethodId',null);

                    var optInForInformational = component.find("optInForInformational");
                    var optInForPromotional = component.find("optInForPromotional");
                    var optInForEvents = component.find("optInForEvents");
                    optInForInformational.set("v.value",true);
                    optInForPromotional.set("v.value",true);
                    optInForEvents.set("v.value",true);

                    helper.ValidateUser(component,record);
                }else{
                    component.set('v.emailAddress',record.Email__c);
                    component.set('v.contactMethodId',record.Id); //updated because this has been change due to merge/purge.
                    console.log('id =' + record.Id);
                    
                    
                    if(brandType == brandTopProducer){
                        helper.setOptIn(component,record.TP_Promo_OptIn__c,record.TP_Info_OptIn__c,record.TP_Event_OptIn__c);
                    }else if(brandType == brandRDC){
                        helper.setOptIn(component,record.RDC_Promo_OptIn__c,record.RDC_Info_OptIn__c,record.RDC_Event_OptIn__c);
                    }else if(brandType == brandEvents){
                        helper.setOptIn(component,record.Events_Informational_opt_in__c,record.Events_events_opt_in__c,record.Events_promotional_opt_in__c);
                    }
                }
            }else if (data.getState() === "ERROR"){
                var optInForInformational = component.find("optInForInformational");
                var optInForPromotional = component.find("optInForPromotional");
                var optInForEvents = component.find("optInForEvents");
                optInForInformational.set("v.value",true);
                optInForPromotional.set("v.value",true);
                optInForEvents.set("v.value",true);
                
                component.set('v.contactMethodIdErrorMsg',$A.get("$Label.c.Invalid_record_in_preference_center_UI"));
                component.set('v.contactMethodIdError',false);
                component.set('v.contactMethodId',null);
                component.set('v.isError',false);
                helper.ValidateUser(component,record);
            }
        });       
        $A.enqueueAction(action);
    },
    optOutChecked : function(component, event, helper){
        var optOut = component.find("optOut");
        var optInForInformational = component.find("optInForInformational");
        var optInForPromotional = component.find("optInForPromotional");
        var optInForEvents = component.find("optInForEvents");
        if(optOut.get("v.value") == true){
            optInForInformational.set("v.value",false);
            optInForPromotional.set("v.value",false);
            optInForEvents.set("v.value",false);
            component.set("v.checkBoxError",false);
             component.set("v.checkBoxError2",false);
        }
    },
    optInChecked : function(component, event, helper){        
        var optOut = component.find("optOut");
        var optInForInformational = component.find("optInForInformational").get("v.value");
        var optInForPromotional = component.find("optInForPromotional").get("v.value");
        var optInForEvents = component.find("optInForEvents").get("v.value");        
        
        if(optInForInformational || optInForPromotional || optInForEvents){
            optOut.set("v.value",false);
            component.set("v.checkBoxError",false);
            component.set("v.checkBoxError2",false);
        }
    },
    handleUpdate : function(component, event, helper){
        
        component.set('v.contactMethodIdError',false);
        component.set("v.checkBoxError",false);
        var optOut = component.find("optOut").get("v.value");
        var optInForInformational = component.find("optInForInformational").get("v.value");
        var optInForPromotional = component.find("optInForPromotional").get("v.value");
        var optInForEvents = component.find("optInForEvents").get("v.value");
        
       /* if(!optInForInformational && !optInForPromotional && !optInForEvents && !optOut){
            component.set('v.checkBoxErrorMsg',$A.get("$Label.c.Checkbox_Error_in_preference_center_UI")); 
            component.set("v.checkBoxError",true);
        }*/
       
            
        var conMethodId=component.get('v.contactMethodId');
        var BrandType=component.get('v.brandType');
        console.log('brandtype>>',BrandType);
        if(conMethodId!=null)
        {
            
            if(!optInForInformational && !optInForPromotional && !optInForEvents && !optOut){
                
            component.set('v.checkBoxErrorMsg',$A.get("$Label.c.Checkbox_Error_in_preference_center_UI")); 
            component.set("v.checkBoxError",true);
                
               
            }
            
            else
            {
            console.log('validcon>>',conMethodId);
            var action1 = component.get("c.savePreferenceRecord");
            action1.setParams({ contactMethodId: component.get('v.contactMethodId'),
                               brandType : component.get('v.brandType'),
                               optInForInformational: optInForInformational,
                               optInForPromotional: optInForPromotional,
                               optInForEvents: optInForEvents
                              });
            action1.setCallback(this, function(result) {   
                // If result state is error or returned value is false, show error message.
                if(result.getState() === "ERROR"){
                    component.set('v.contactMethodIdErrorMsg',$A.get("$Label.c.Invalid_record_in_preference_center_UI"));
                    component.set('v.contactMethodIdError',true);
                }
                /*if(!result.getReturnValue()){
                    component.set('v.contactMethodIdErrorMsg',$A.get("$Label.c.SFMC_Eng_List_Error"));
                    component.set('v.contactMethodIdError',true);
                }*/
                else{
                    var record = result.getReturnValue();
                    console.log('record updated');
                    
                    var evt = $A.get("e.c:SFMC_PreferenceEvent");
                    console.log('evt'+evt);
                    evt.setParams({
                        showConfirmationPage: true
                    });
                    
                    evt.fire();
                }
            });
            $A.enqueueAction(action1);
            }
        }
        else
        {
            var validExpense = component.find('Email').reduce(function (validSoFar, inputCmp) {
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar && inputCmp.get('v.validity').valid;
            }, true);
            
            if(validExpense){
                // helper.saverecord(component,event, helper);
                 if(!optInForInformational && !optInForPromotional && !optInForEvents && !optOut){
            component.set('v.checkBoxErrorMsg',$A.get("$Label.c.Checkbox_Error_in_preference_center_UI")); 
            component.set("v.checkBoxError",true);
        }
                else{
                var action1 = component.get("c.saveEmailPreferenceRecord");
                var emailId = component.get('v.emailAddress');
                console.log('emailid>>',emailId);
                action1.setParams({email:emailId ,
                                   brandType : component.get('v.brandType'),
                                   optInForInformational: optInForInformational,
                                   optInForPromotional: optInForPromotional,
                                   optInForEvents: optInForEvents
                                  });
                action1.setCallback(this, function(result) {   
                    // If result state is error or returned value is false, show error message.
                    if(result.getState() === "ERROR"){
                        component.set('v.contactMethodIdErrorMsg',$A.get("$Label.c.Invalid_record_in_preference_center_UI"));
                        component.set('v.contactMethodIdError',true);
                    }
                    /*if(!result.getReturnValue()){
                        component.set('v.contactMethodIdErrorMsg',$A.get("$Label.c.SFMC_Eng_List_Error"));
                        component.set('v.contactMethodIdError',true);
                    }*/
                    else{
                        var record = result.getReturnValue();
                        console.log('record updated');
                        
                        var evt = $A.get("e.c:SFMC_PreferenceEvent");
                        console.log('evt'+evt);
                        evt.setParams({
                            showConfirmationPage: true
                        });
                        
                        evt.fire();
                    }
                });
                $A.enqueueAction(action1);
                
            }
        }
        }
    },
    
    handleClearError:function(cmp,event,helper){
        
        var comp = event.getSource();
        var emailid=component.find("Email");
        var email=emailid.get("v.value");
        //$A.util.removeClass(comp, "error");
        emailid.set("v.errors", [{message: null}]);
        $A.util.removeClass(emailid, 'slds-has-error');
        
    },
    
    
     validateEmail : function(component, event, helper){
        var emailId = component.get("v.emailAddress");
        var emailField = event.getSource();
            emailField.setCustomValidity('');
            emailField.reportValidity(); 
        if(emailId ==null){
             var errorLabel = $A.get("$Label.c.SFMC_Email_Validation");
                emailField.setCustomValidity(errorLabel);
                emailField.reportValidity();
                return;
            
            
        }
        
    },
})