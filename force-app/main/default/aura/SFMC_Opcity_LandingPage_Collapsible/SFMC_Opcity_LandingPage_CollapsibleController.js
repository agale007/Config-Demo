({
 // common reusable function for toggle sections
    toggleSection : function(component, event, helper) {
        // dynamically get aura:id name from 'data-auraId' attribute
        var sectionAuraId = event.currentTarget.getAttribute("data-auraid");
        console.log('sectionAuraId = ' + sectionAuraId);
        // get section Div element using aura:id
        var sectionDiv = component.find(sectionAuraId).getElement();
        /* The search() method searches for 'slds-is-open' class, and returns the position of the match.
         * This method returns -1 if no match is found.
        */
        var sectionState = sectionDiv.getAttribute('class').search('slds-is-open'); 
                
        console.log('sectionDiv = ' + sectionDiv);
        
        // -1 if 'slds-is-open' class is missing...then set 'slds-is-open' class else set slds-is-close class to element
        if(sectionState == -1){
            sectionDiv.setAttribute('class' , 'slds-section slds-is-open');
        }else{
            sectionDiv.setAttribute('class' , 'slds-section slds-is-close');
        }
        
        if(sectionAuraId == 'colorSection1'){
            component.set("v.iconName1",
                          component.get("v.iconName1")=="action:new"?
                          "action:close":"action:new");
        }else if(sectionAuraId == 'colorSection2'){
            component.set("v.iconName2",
                          component.get("v.iconName2")=="action:new"?
                          "action:close":"action:new");
        }else if(sectionAuraId == 'colorSection3'){
            component.set("v.iconName3",
                          component.get("v.iconName3")=="action:new"?
                          "action:close":"action:new");
        }else if(sectionAuraId == 'colorSection4'){
            component.set("v.iconName4",
                          component.get("v.iconName4")=="action:new"?
                          "action:close":"action:new");
        }else if(sectionAuraId == 'colorSection5'){
            component.set("v.iconName5",
                          component.get("v.iconName5")=="action:new"?
                          "action:close":"action:new");
        }
    }
})