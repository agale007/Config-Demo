import { LightningElement } from 'lwc';
import Fortis_Logo from '@salesforce/resourceUrl/FortisLogo';
import carousel_First from '@salesforce/resourceUrl/carouselFirst';
import carousel_Second from '@salesforce/resourceUrl/carouselSecond';
import carousel_Third from '@salesforce/resourceUrl/carouselThird';
import midddle_Image from '@salesforce/resourceUrl/midddleImage';
import mobile_Phone from '@salesforce/label/c.MobileNumber';
let slideIndex = 0;



constructor(){
    super();
    showSlides();

}


export default class HomePage extends LightningElement {
    fortisLogoUrl = Fortis_Logo;
    carouselFirst = carousel_First;
    carouselSecond = carousel_Second;
    carouselThird = carousel_Third;
    midddleImage = midddle_Image;
    
    label = {
        mobile_Phone
    };

    
    
    showSlides() {
        var i;
        var slides = this.template.querySelectorAll('.myslides');
        var dots = this.template.querySelectorAll('.dot');
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
        // eslint-disable-next-line @lwc/lwc/no-async-operation
         // Change image every 2 seconds
         setTimeout(showSlides,2000);
        
      }

}