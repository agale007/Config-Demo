({
    init : function(cmp, evt, hlp) {
        $A.util.addClass(cmp.find('slots'),'slds-hide');
    },
    checkSlots : function(cmp,evt,hlp) {
        hlp.getSlotAvailable(cmp,evt,hlp);
    }
})