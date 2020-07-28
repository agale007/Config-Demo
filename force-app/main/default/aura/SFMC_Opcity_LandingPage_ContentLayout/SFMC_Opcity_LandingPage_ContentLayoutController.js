({
	doInit : function(component, event, helper) {
        var prefixString = $A.get('$Resource.OpcityContents') + '/assets/images/';
        component.set('v.prefixString', prefixString);
	},
    
    handleContentCount : function(component, event, helper){
      var contentCount = event.getParam("count");
        //component.set('v.contentCount', contentCount); 
        var temp = [];
        if(contentCount){
            for(var i=0; i<contentCount;i++){
                temp.push(i);
            }
        }
        component.set('v.contentCount',temp);
    }
    
})