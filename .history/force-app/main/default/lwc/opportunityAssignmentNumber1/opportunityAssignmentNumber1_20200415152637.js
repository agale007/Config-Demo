import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunityAssignmentNumber1 extends LightningElement {
    @api recordId;
    @track cardTitle='New Opportunity';


    handleValidation() {
        console.log('insubmit button');
        const allValid = [this.template.querySelectorAll('.validValue')]
            .reduce((validSoFar, inputCmp) => {
                        inputCmp.reportValidity();
                        return validSoFar && inputCmp.checkValidity();
            }, true);
        if (allValid) {
            //Submit information on Server
        } else {
            alert('Please fill required and update all invalid form entries');
        }
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
    

}