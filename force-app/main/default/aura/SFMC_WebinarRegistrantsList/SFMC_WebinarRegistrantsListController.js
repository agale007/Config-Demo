({
	doInit : function(component, event, helper) {
		helper.getRegistrantsList(component, event, helper);
        component.set("v.filterSelector",'all');
	},
    getWebinarMembers : function(component, event, helper) {
        helper.getRegistrantsListByLastName(component, event, helper);
    }, 
    
    exportRecord: function(component, event, helper){
        var stockData = component.get("v.allRegistarents");
        var webinarName = component.get("v.webinarName");
        var csv = helper.exportToCSV(component,stockData);   
        if (csv == null){return;} 
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_self';
        hiddenElement.download = webinarName+'.csv';  
        document.body.appendChild(hiddenElement); 
        hiddenElement.click(); 
    }
})