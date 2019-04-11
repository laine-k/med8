import { Component, ViewChild } from '@angular/core';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage {

  
    @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;

    constructor() {}
  

    testMarker(){

      let center = this.mapComponent.map.getCenter();
      // this.mapComponent.addMarker(center.lat(), center.lng(),);
    }   
}
