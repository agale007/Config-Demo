import { LightningElement } from 'lwc';
import IMG1 from '@salesforce/resourceUrl/img1';
import IMG2 from '@salesforce/resourceUrl/img2';
import IMG3 from '@salesforce/resourceUrl/img3';
import IMG4 from '@salesforce/resourceUrl/img4';
import IMG5 from '@salesforce/resourceUrl/img5';
import IMG6 from '@salesforce/resourceUrl/img6';


export default class LwcAssignment5 extends LightningElement {
    console.log('img1',IMG1);
    imgUrl = [IMG1,IMG2,IMG3,IMG4,IMG5,IMG6];
}