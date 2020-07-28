/* eslint-disable no-console */
import { LightningElement,track } from 'lwc';
import getAccountList from '@salesforce/apex/LwcDemo.getAccountList';

export default class Customizeddatatable extends LightningElement {
    @track data = [];
    connectedCallback() {
        this.columns = [
            { label: 'Name', fieldName: 'Name', typeAttributes: { acceptedFormats: '.jpg,.jpeg,.pdf,.png' } },
            { label: 'Account Number', fieldName: 'AccountNumber' },
            { label: 'Upload', type: 'fileUpload', fieldName: 'Id' }
        ];
        // eslint-disable-next-line no-undef
        getAccountList().then(res => { this.data = res; }).catch(err => console.error(err));
    }
    handleUploadFinished(event) {
        event.stopPropagation();
        console.log('data => ', JSON.stringify(event.detail.data));
    }
}