import { Component, ViewChild } from '@angular/core';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';
import {  MenuController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage {

  
    @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;

    constructor(private camera: Camera) {
      
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
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        //console.log(imageData, 'image data');
        let base64Image = 'data:image/jpeg;base64,' + imageData;
       }, (err) => {
        // Handle error
       });
    } 
}
