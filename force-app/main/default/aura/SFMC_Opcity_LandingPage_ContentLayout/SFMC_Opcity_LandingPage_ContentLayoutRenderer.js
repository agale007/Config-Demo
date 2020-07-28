({
	afterRender : function( component, helper ) {
        this.superAfterRender();
       
       /*//This will bring focus on div that contains body of modal and enable user to scroll by using keyboard keys.
       if(!$A.util.isEmpty(component.find('scrollableDiv')) &&
        !$A.util.isEmpty(component.find('scrollableDiv').getElement()) &&
         component.get('v.focusForKeypadScroll')){
        component.find('scrollableDiv').getElement().focus(); 
       }*/
       
       // this is done in renderer because we don't get
       // access to the window element in the helper js.
       // per John Resig, we should not take action on every scroll event
       // as that has poor performance but rather we should take action periodically.
       // http://ejohn.org/blog/learning-from-twitter/
       var modContent = component.find('contentLayoutId').getElement();
        var modContent1 = component.find('contentLayoutId');
       var mod = window.addEventListener('scroll', function(event) {
           
           if (window.pageYOffset > modContent.scrollTop) {
               $A.util.addClass(modContent1, 'sticky1');
           } else {
               $A.util.removeClass(modContent1, 'sticky1');
           }
       });
       // periodically attach the scroll event listener
       // so that we aren't taking action for all events
      
    }
})