import { LightningElement,api,wire} from 'lwc';
import getPicklistValues from '@salesforce/apex/LwcDemo.fatchPickListValue';
export default class PocCustomComp extends LightningElement {
    @wire(getPicklistValues, {objInfo: {'sobjectType' : 'Opportunity'},
    picklistFieldApi: 'StageName'}) stageNameValues;

onValueSelection(event){
// eslint-disable-next-line no-alert
alert(event.target.value);
} 
}