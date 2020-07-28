import { LightningElement } from 'lwc';
import templateOne from './templateOne.html';
import templateTwo from './templateTwo.html';
export default class LwcAssignment4 extends LightningElement {
    render() {
        //return templateOne;
        return window.screen.width < 768 ? templateOne : templateTwo;
    }
}