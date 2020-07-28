({
    
    ValidateUser : function(component,record)
    {
        console.log('invalidatemethod>>',record);
        var userType = component.get("v.userType");
        console.log('user>>',userType);
        if(userType === "Standard")
        {
              component.set('v.contactMethodIdErrorMsg',$A.get("$Label.c.Invalid_record_in_preference_center_UI"));
              component.set('v.contactMethodIdError',true);
                

        }
    },
    
	setOptIn : function(component, optInForInformationalVal, optInForPromotionalVal, optInForEventsVal) {
		var optInForInformational = component.find("optInForInformational");
        var optInForPromotional = component.find("optInForPromotional");
        var optInForEvents = component.find("optInForEvents");
        var optOut = component.find("optOut");
		
        if(!optInForInformationalVal && !optInForPromotionalVal && !optInForEventsVal){
            optInForInformational.set("v.value",false);
            optInForPromotional.set("v.value",false);
            optInForEvents.set("v.value",false);
            optOut.set("v.value",true)
        }
        if(optInForInformationalVal){
            optInForInformational.set("v.value",true); 
        }else{
            optInForInformational.set("v.value",false);
        }
        if(optInForPromotionalVal){
            optInForPromotional.set("v.value",true);
        }else{
            optInForPromotional.set("v.value",false);
        }
        if(optInForEventsVal){
            optInForEvents.set("v.value",true);
        }else{
            optInForEvents.set("v.value",false);
        }        
    }
})