import {LightningElement,wire,track} from 'lwc';

import ContactList from '@salesforce/apex/LwcDemo.getContactList';
import deleteContacts from '@salesforce/apex/LwcDemo.deleteContact';
import activeeventlabel from '@salesforce/label/c.ActiveEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class TableLwc extends LightningElement {
    @wire(ContactList)contacts;
   
    @track clickedButtonLabel;
    label={
        activeeventlabel
    };

    Delete(event) {
        this.clickedButtonLabel = event.target.label;
        // eslint-disable-next-line no-undef
        // eslint-disable-next-line no-console
        console.log('button name',event.target.value);
        // eslint-disable-next-line no-unused-expressions
        (deleteContacts,{conId: event.target.value
        });
    }

    deleteAccount() {
          
        deleteRecord(this.contacts.Id)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account Deleted',
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting account',
                    message: error.message.body,
                    variant: 'error',
                }),
            );
        });   


      }
}

