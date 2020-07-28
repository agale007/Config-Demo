import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunityAssignmentNumber1 extends LightningElement {
    @api recordId;
    @track cardTitle='New Opportunity';


    handleValidation() {
        console.log('insubmit button');
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            if (element.fieldName ==='Name') {
                console.log('in name field');
                if (element.value) {
                    console.log('in false field');
                    this.iserror = false;
                } else {
                    this.iserror = true;
                }
            }
        });
    } 

    handleCustomValidationFirstName(event) {
        let inputValue = event.target.value;
        let inputFirstName=this.template.querySelector(".OppName"); 
        if(inputValue.indexOf('@')>=0) {
             //set an error
            inputFirstName.setCustomValidity("Please Don't include '@' in First name");
            inputFirstName.reportValidity();
        }else {         
             //reset an error
            inputFirstName.setCustomValidity('');
            inputFirstName.reportValidity(); 
           
        }
    }
    
    handleSuccess (){
        const evt = new ShowToastEvent({
            title: "Success!",
            message: "The Opportunity's record has been successfully saved.",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }

    handleError (){
        const evt = new ShowToastEvent({
            title: "Error!",
            message: "Error Ocuured!",
            variant: "Error",
        });
        this.dispatchEvent(evt);
    }
    
    

}