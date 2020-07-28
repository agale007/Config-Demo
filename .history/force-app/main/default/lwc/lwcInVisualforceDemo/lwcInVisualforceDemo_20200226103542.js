import { LightningElement, track, wire } from 'lwc';
// importing apex class and method to retrive accounts
import retriveAccounts  from '@salesforce/apex/LWCExampleController.fetchAccounts';

export default class LwcInVisualforceDemo extends LightningElement {

    // to track object name from vf page
    @track objName = 'Account';
    @track accData;
    @track error;

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
}