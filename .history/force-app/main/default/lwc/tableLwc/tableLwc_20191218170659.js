import {LightningElement,wire,track} from 'lwc';

import ContactList from '@salesforce/apex/LwcDemo.getContactList';
import deleteContact from '@salesforce/apex/LwcDemo.deleteContact';
import activeeventlabel from '@salesforce/label/c.ActiveEvent';

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
        newFunction(event);
    }
}

function newFunction(event) {
    @wire(deleteContact,{conId: event.target.value
    });
}
