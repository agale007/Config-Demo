import { LightningElement, track} from 'lwc';

// import uiRecordApi to create record
import { createRecord } from 'lightning/uiRecordApi';
// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

// importing Account fields
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import Stage_FIELD from '@salesforce/schema/Opportunity.StageName';
import Amount_FIELD from '@salesforce/schema/Opportunity.Amount';
import Description_FIELD from '@salesforce/schema/Opportunity.Description';
import CloseDate_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import LeadSource_FIELD from '@salesforce/schema/Opportunity.LeadSource';

export default class CreateRecordInLWC extends LightningElement {
    @track error;

    // this object have record information
    @track oppRecord = {
        Name : NAME_FIELD,
        StageName : Stage_FIELD,
        Amount : Amount_FIELD,
        Description : Description_FIELD,
        CloseDate : CloseDate_FIELD,
        LeadSource : LeadSource_FIELD
    };


    handleNameChange(event) {
        this.oppRecord.Name = event.target.value;
        
    }

    handleStageChange(event) {
        this.oppRecord.StageName = event.target.value;
      
    }

    handleAmountChange(event) {
        this.oppRecord.Amount = event.target.value;
        
    }

    handleDescriptionChange(event) {
        this.oppRecord.Description = event.target.value;
        
    }
    handleCloseDateChange(event) {
        this.oppRecord.CloseDate = event.target.value;
        
    }
    handleLeadSourceChange(event) {
        this.oppRecord.LeadSource = event.target.value;
        
    }


    handleSave() {
        const fields = {};

        

        fields[NAME_FIELD.fieldApiName] = this.oppRecord.Name;
        fields[Stage_FIELD.fieldApiName] = this.oppRecord.StageName;
        fields[Amount_FIELD.fieldApiName] = this.oppRecord.Amount;
        fields[Description_FIELD.fieldApiName] = this.oppRecord.Description;
        fields[CloseDate_FIELD.fieldApiName] = this.oppRecord.CloseDate;
        fields[LeadSource_FIELD.fieldApiName] = this.oppRecord.LeadSource;
       
       
        // Creating record using uiRecordApi
        let recordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, fields }
        createRecord(recordInput)
        .then(result => {
            // Clear the user enter values
            this.oppRecord = {};

           
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Account Created Successfully!!',
                variant: 'success'
            }),);
        })
        .catch(error => {
           const errormsg = JSON.stringify(error);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error!!',
                message:errormsg ,
                variant: 'error'
            }),);
        });
    }
}