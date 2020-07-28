import { LightningElement , track,api} from 'lwc';

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
}