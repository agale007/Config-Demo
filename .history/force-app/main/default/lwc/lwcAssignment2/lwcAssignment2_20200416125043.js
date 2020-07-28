import { LightningElement, track , api,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactList.getContactList';
export default class LightningExampleAccordionMultiple extends LightningElement {
    @api recordId;
    @wire(getContactList, {accountid: '$recordId'}) contacts;
    @track activeSectionsMessage = '';


    navigateToRecordViewPage(event) {
        // View a custom object record.
        const iddd=event.target.value;
        console.log('idd',iddd);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: "a03B0000002tEurIAE",
                objectApiName: 'namespace__ObjectName', // objectApiName is optional
                actionName: 'view'
            }
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
