({
    doInit : function(component, event, helper) {
        /*START
         
         * CSS Function Added by Ravi
         * DATE:06/09/2019 */ 
        function scrollFunction() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        component.find("myHeader").getElement().style.zoom = "65%";
        //component.find("myImg").getElement().style.zoom = "65%";    
        //document.getElementById("myHeader").style.height = "35px";
        } else {
        component.find("myHeader").getElement().style.zoom = "";
        //component.find("myImg").getElement().style.zoom = "100%";
        //document.getElementById("myHeader").style.height = "90px";
        }
        }
         
        window.onscroll = function() {scrollFunction()};
        /*var header = document.getElementById("myHeader");
        var sticky = header.offsetTop;
        function myFunction() {
        if (window.pageYOffset > sticky)
        header.classList.add("sticky1");
        } else {
        header.classList.remove("sticky1");
        }
       }*/
       /*
        * END  */
        
        var prefixString = $A.get('$Resource.LandingPageImages') + '/assets/images/';
        component.set('v.prefixString', prefixString);
        
        /*var stickyHeader = document.getElementById('contentLayoutId');
        if(!$A.util.isEmpty(stickyHeader)){
        	//stickyHeader = stickyHeader.getElement();
        	var sticky = stickyHeader.offsetTop;
            
            window.onscroll = function(){
                console.log('true '+window.pageYOffset);
                console.log('sticky '+sticky);
        	}
        }
        window.addEventListener('scroll', $A.getCallback(function(){
            if (window.pageYOffset > sticky) {
                 $A.util.addClass(stickyHeader, 'sticky');
            } else {
                $A.util.removeClass(stickyHeader, 'sticky');
            }
        }));*/
        
    },
    
    setTextAlignment : function(component, event, helper){
        switch(event.getParam('oldValue')){
            case 'left':
                component.set('v.textAlignmentClass', 'slds-float_left');
                break;
            case 'right':
                component.set('v.textAlignmentClass', 'slds-float_right');
                break;
            case 'centre':
                component.set('v.textAlignmentClass', 'slds-align_absolute-center');
                break;              
        }
    },
    
    setBrandAlignment : function(component, event, helper){
        switch(event.getParam('oldValue')){
            case 'left':
                component.set('v.brandAlignmentClass', 'slds-float_left');
                break;
            case 'right':
                component.set('v.brandAlignmentClass', 'slds-float_right');
                break;
            case 'centre':
                component.set('v.brandAlignmentClass', 'slds-align_absolute-center');
                break;              
        }
    }
})