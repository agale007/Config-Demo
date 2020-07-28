import { LightningElement, track , api,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactList.getContactList';
import { NavigationMixin } from 'lightning/navigation';
export default class LightningExampleAccordionMultiple extends LightningElement {
    @api recordId;
    @wire(getContactList, {accountid: '$recordId'}) contacts;
    @track activeSectionsMessage = '';


    navigateToViewRecordPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": this.recordId,
                "objectApiName": "Contact",
                "actionName": "view"
            },
        });
    }
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
