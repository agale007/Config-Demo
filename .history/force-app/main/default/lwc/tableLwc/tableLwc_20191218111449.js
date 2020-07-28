/* eslint-disable no-undef */
import {LightningElement,wire,track} from 'lwc';

import ContactList from '@salesforce/apex/LwcDemo.getContactList';
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
        console.log('button name',event.target.label);
    }
}