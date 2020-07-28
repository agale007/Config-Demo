({
	getHeadline : function(component, event, helper) {
		var copySub = component.get('v.subheadline');
        var copyHead = component.get('v.headline');
        let expert = false;
        
        
        let parserHead = new DOMParser();
        let parserSub = new DOMParser();
        parserHead = parserHead.parseFromString(copyHead, "text/html");
        parserSub = parserSub.parseFromString(copySub, "text/html");
        parserHead = parserHead.getElementsByTagName('body')[0].innerHTML;
        parserSub = parserSub.getElementsByTagName('body')[0].innerHTML;
        document.getElementById('head1').innerHTML = parserHead;
        document.getElementById('subhead1').innerHTML = parserSub;
        document.getElementById('head2').innerHTML = parserHead;
        document.getElementById('subhead2').innerHTML = parserSub;
        
	}
})