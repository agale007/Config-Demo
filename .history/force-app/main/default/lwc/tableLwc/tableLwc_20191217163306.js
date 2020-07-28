import {LightningElement,wire} from 'lwc';

import ContactList from '@salesforce/apex/LwcDemo.getContactList';

export default class TableLwc extends LightningElement {
    @wire(ContactList) stageNameValues;
}