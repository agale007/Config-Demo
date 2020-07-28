import { LightningElement, track , api,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactList.getContactList';
export default class LightningExampleAccordionMultiple extends LightningElement {
    @api recordId;
    @wire(getContactList, {accountid: '$recordId'}) contacts;
    @track activeSectionsMessage = '';

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }
}
