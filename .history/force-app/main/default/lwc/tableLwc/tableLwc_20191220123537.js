import {LightningElement,wire,track} from 'lwc';

import ContactList from '@salesforce/apex/LwcDemo.getContactList';

import activeeventlabel from '@salesforce/label/c.ActiveEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class TableLwc extends LightningElement {
    @wire(ContactList)contacts;
   
    @track clickedButtonLabel;
    label={
        activeeventlabel
    };

 

    deleteAccount() {
          
        deleteRecord(this.ContactList.Id)
        .then(() => {
            this.dispatchEvent(
                // eslint-disable-next-line no-undef
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account Deleted',
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            this.dispatchEvent(
                // eslint-disable-next-line no-undef
                new ShowToastEvent({
                    title: 'Error deleting account',
                    message: error.message.body,
                    variant: 'error',
                }),
            );
        });   


      }
}

