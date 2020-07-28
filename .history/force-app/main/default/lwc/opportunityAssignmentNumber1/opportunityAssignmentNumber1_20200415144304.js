import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunityAssignmentNumber1 extends LightningElement {
    @api recordId;
    @track cardTitle='New Opportunity';
    
    handleSuccess (){
        const evt = new ShowToastEvent({
            title: "Success!",
            message: "The Opportunity's record has been successfully saved.",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
    

}