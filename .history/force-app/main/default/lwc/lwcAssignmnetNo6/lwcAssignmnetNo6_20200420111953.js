import { LightningElement , track} from 'lwc';

export default class LwcAssignmnetNo6 extends LightningElement {
    @track openmodel = false;
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