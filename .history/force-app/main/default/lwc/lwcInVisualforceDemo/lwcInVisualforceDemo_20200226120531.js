import { LightningElement, track, wire } from 'lwc';
// importing apex class and method to retrive accounts
import retriveAccounts  from '@salesforce/apex/LWCExampleController.fetchAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcInVisualforceDemo extends LightningElement {

    // to track object name from vf page
    @track objName = 'Account';
    @track accData;
    @track error;
    @track messages='demo';

    // getting accounts using wire service
    @wire(retriveAccounts, {strObjectName : '$objName'})
    accounts({data, error}) {
        if(data) {
            this.accData = data;
            this.error = undefined;
        }
        else if(error) {
            this.accData = undefined;
            this.error = error;
            window.console.log(error);
        }
    }

    handleSuccess() {
     
        // eslint-disable-next-line no-console
        console.log("Lightning success!!");
            
        const showSuccess = new ShowToastEvent({
            title: 'Success!!',
            message: '$messages',
            variant: 'Success',
        });
        this.dispatchEvent(showSuccess);
    }
    
    handleError() {
        const showError = new ShowToastEvent({
            title: 'Error!!',
            message: 'This is Error message.',
            variant: 'error',
        });
        this.dispatchEvent(showError);
    }

    handleWarning() {
        const showWarning = new ShowToastEvent({
            title: 'Warning!!',
            message: 'This is Warning message.',
            variant: 'warning',
        });
        this.dispatchEvent(showWarning);
    }

    handleInfo() {
        const showInfo = new ShowToastEvent({
            title: 'Info!!',
            message: 'This is Info message.',
            variant: 'info',
        });
        this.dispatchEvent(showInfo);
    } 

}