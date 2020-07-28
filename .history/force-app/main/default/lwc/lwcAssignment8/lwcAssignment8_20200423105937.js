import { LightningElement, wire, track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation'; 
/*import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import ID_FIELD from '@salesforce/schema/Contact.Id';*/

import ID_FIELD from '@salesforce/schema/Contact.Id'
import Phone_FIELD from '@salesforce/schema/Contact.Phone';
import Email_FIELD from '@salesforce/schema/Contact.Email';
import MailingAddress_FIELD from '@salesforce/schema/Contact.MailingAddress';


const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' }
];

const COLS = [
    { label: 'First Name', fieldName: 'FirstName'},
    { label: 'Last Name', fieldName: 'LastName'},
    { label: 'Account Name', fieldName: 'AccountId' },
    { label: 'Phone', fieldName: 'Phone',type: 'phone', editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true},
    { label: 'MailingAddress', fieldName: 'MailingAddress', type: 'Address' , editable: true }, 
    { label: 'Owner Name', fieldName: 'OwnerId' },  

  //  { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left' } }

    {type: "button", typeAttributes: {  
        label: 'View',  
        name: 'View',  
        title: 'View',  
        disabled: false,  
        value: 'view',  
        iconPosition: 'left'  
    }},  
    {type: "button", typeAttributes: {  
        label: 'Edit',  
        name: 'Edit',  
        title: 'Edit',  
        disabled: false,  
        value: 'edit',  
        iconPosition: 'left'  
    }}  


];


export default class LwcAssignment8 extends NavigationMixin(LightningElement) {

    @track error;
    @track columns = COLS;
    @track draftValues = [];

    @wire(getContactList)
    contact;

  

    handleSave(event) {

        const fields = {};
       /* fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
        fields[LASTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].LastName;*/
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[Phone_FIELD.fieldApiName] = event.detail.draftValues[0].Phone;
        fields[Email_FIELD.fieldApiName] = event.detail.draftValues[0].Email;
        fields[MailingAddress_FIELD.fieldApiName] = event.detail.draftValues[0].MailingAddress;

        const recordInput = {fields};

        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
            // Clear all draft values
            this.draftValues = [];

            // Display fresh data in the datatable
            return refreshApex(this.contact);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    callRowAction( event ) {  
          
        const recId =  event.detail.row.Id;  
        const actionName = event.detail.action.name;  
        if ( actionName === 'Edit' ) {  
  
            this[NavigationMixin.Navigate]({  
                type: 'standard__recordPage',  
                attributes: {  
                    recordId: recId,  
                    objectApiName: 'Contact',  
                    actionName: 'edit'  
                }  
            })  
  
        } else if ( actionName === 'View') {  
  
            this[NavigationMixin.Navigate]({  
                type: 'standard__recordPage',  
                attributes: {  
                    recordId: recId,  
                    objectApiName: 'Contact',  
                    actionName: 'view'  
                }  
            })  
  
        }          
  
    } 
}