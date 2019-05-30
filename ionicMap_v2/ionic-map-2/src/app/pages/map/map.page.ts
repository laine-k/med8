import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';
import {  MenuController, NavController, NavParams } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Plugins } from '@capacitor/core';
import { ImagesService } from '../../images.service';
const { Geolocation, Network } = Plugins;
import {DomSanitizer} from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx';
declare let window: any; // <--- Declare it like this
@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage {

    public base64Image;
    public params = {image:{}, location:{}};
    
    @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;

    constructor(private file: File, private sanitizer: DomSanitizer, private camera: Camera, public router: Router, public navCtrl:NavController,private imgService:ImagesService) {
      
    }  
  

    testMarker(){

      let center = this.mapComponent.map.getCenter();
      // this.mapComponent.addMarker(center.lat(), center.lng(),);
    }  
    startCamera(){
      console.log("start camera");
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: true,
        correctOrientation: true
      }
      this.camera.getPicture(options).then((imageData) => {
    
     
      this.params.image = window.Ionic.WebView.convertFileSrc(imageData);
      console.warn('NEW PARAMS',this.params.image );

       // add geolocation together with image data and pass to the service
       Geolocation.getCurrentPosition({ timeout: 50000, enableHighAccuracy: false }).then((position) => {      
        this.params.location = {lat:position.coords.latitude, long:position.coords.longitude};  
        this.imgService.addImageItem(this.params);
        this.router.navigate(['/story']);        
    }, (err) => {
        console.log(err, 'getCurrentPosition error');

    });        
       }, (err) => {
        // Handle error
       });
    }    
}
