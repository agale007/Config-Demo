import { LightningElement } from 'lwc';
import Fortis_Logo from '@salesforce/resourceUrl/FortisLogo';
import carousel_First from '@salesforce/resourceUrl/carouselFirst';
import carousel_Second from '@salesforce/resourceUrl/carouselSecond';
import carousel_Third from '@salesforce/resourceUrl/carouselThird';
import midddle_Image from '@salesforce/resourceUrl/midddleImage';

export default class HomePage extends LightningElement {
    fortisLogoUrl = Fortis_Logo;
    carouselFirst = carousel_First;
    carouselSecond = carousel_Second;
    carouselThird = carousel_Third;
    midddleImage = midddle_Image;
}