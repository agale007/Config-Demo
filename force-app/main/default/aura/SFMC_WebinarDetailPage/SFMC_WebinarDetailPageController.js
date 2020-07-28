({
	initData : function(component, event, helper) {
        console.log('initData>>');
		helper.getData(component,event,helper);
	},
    editWebinar : function(component,event,helper)
    {
        /*var recordId = event.getSource().get("v.value");
    	console.log('in edit webinar>>',recordId);    
    	component.set("v.selectedIdForWebinar",recordId);
        component.set("v.showEditModal",true);
       console.log('showEditWebinar>>',component.get("v.showEditModal"));*/
        var webinarIdAndTimeString = event.getSource().get("v.value");
        var webinarDetailArr  = webinarIdAndTimeString.split('#');
        console.log('webinarDetailArr>>',webinarDetailArr);
        var recordId = webinarDetailArr[0];
        var recordStartDateTime = webinarDetailArr[1];
        component.set("v.selectedIdForWebinar",recordId);
        component.set("v.selectedStartTimeForWebinar",recordStartDateTime);
        component.set("v.showEditModal",true);
    },
    handleComponentEvent : function(component,event,helper)
    {
        var params = event.getParams();
        console.log('in handleComponentEvent>>');
        console.log('params.showModal>>',params.showModal);
        if(params.context=='Hide_Edit_Modal'){
        component.set("v.showEditModal",params.showModal);
            helper.getData(component,event,helper);
            component.refreshPage();
        }
    },
    viewRegistrants : function(component,event,helper){
        var recordId = event.getSource().get("v.value");
        console.log('recordId>>',recordId);
        var Webinarid = event.target.getElementsByClassName('WebinarId')[0].value;
    	var webinarName = event.target.getElementsByClassName("WebinarName")[0].value;
        console.log("Webenar Id : "+ Webinarid);
        console.log("Webenar Name : "+ webinarName);
        console.log("Webenar Key : "+ recordId);
        component.set("v.webinarKey",recordId);
        component.set("v.webinarId",Webinarid);
        component.set("v.webinarName",webinarName);
        component.set("v.showRegistarent",true);
        component.set("v.showWebinarList",false);
        
    },
    WebinarsList : function(component,event,helper){
        component.set("v.webinarKey","");
        component.set("v.showRegistarent",false);
        component.set("v.showWebinarList",true);
    }
})