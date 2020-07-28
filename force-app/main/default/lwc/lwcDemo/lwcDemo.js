
 
 
import {LightningElement,wire} from 'lwc';
// import apex method reference from controller
import getPicklistValues from '@salesforce/apex/LwcDemo.fatchPickListValue';
 
export default class GetPickListValueInLWC extends LightningElement {
    //  invoke apex method with wire property and fetch picklist options.
    // pass 'object information' and 'picklist field API name' method params which we need to fetch from apex
     @wire(getPicklistValues, {objInfo: {'sobjectType' : 'Opportunity'},
                                picklistFieldApi: 'StageName'}) stageNameValues;
     
     onValueSelection(event){
      // eslint-disable-next-line no-alert
      alert(event.target.value);
     }                      
    }
                        

 