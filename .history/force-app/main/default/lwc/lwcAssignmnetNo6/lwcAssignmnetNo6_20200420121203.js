import { LightningElement , track,api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcAssignmnetNo6 extends LightningElement {
    @track openmodel = false;
    @api recordId;
    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    } 
    saveMethod() {

        this.closeModal();
    }

    handleSuccess (){
        const evt = new ShowToastEvent({
            title: "Success!",
            message: "The Contact's record has been successfully saved.",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
}