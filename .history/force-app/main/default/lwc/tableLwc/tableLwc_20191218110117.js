import {LightningElement,wire,track} from 'lwc';

import ContactList from '@salesforce/apex/LwcDemo.getContactList';
import activeeventlabel from '@salesforce/label/c.ActiveEvent';

export default class TableLwc extends LightningElement {
    @wire(ContactList)contacts;
    @track buttonlabel;
    label={
        activeeventlabel
    };

    Delete(event) {
        this.buttonlabel = event.target.label;
    }
}