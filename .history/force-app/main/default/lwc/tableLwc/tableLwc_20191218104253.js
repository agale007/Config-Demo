import {LightningElement,wire} from 'lwc';

import ContactList from '@salesforce/apex/LwcDemo.getContactList';
import activeeventlabel from '@salesforce/label/c.ActiveEvent';

export default class TableLwc extends LightningElement {
    @wire(ContactList)contacts;
    label={
        activeeventlabel
    };
}