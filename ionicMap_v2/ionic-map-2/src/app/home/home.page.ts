import { Component, ViewChild } from '@angular/core';
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // marker vars
  private iconCastle = '../../../assets/icon/castle.png';
  private iconCave = '../../../assets/icon/cave.png';
  private iconHill = '../../../assets/icon/castle.png';


  private markerGutmanaCave = {lat:57.176364, long:24.842824};
  private markerTuraidaCastle = {lat:57.182835, long:24.850292};
  private markerFolksongHill = {lat:57.183948, long:24.853241};
  @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;
    constructor() {

    }

    testMarker(){

        let center = this.mapComponent.map.getCenter();
        // this.mapComponent.addMarker(center.lat(), center.lng(),);

    }
    addRouteMarkers(){
      this.mapComponent.addMarker(this.markerGutmanaCave.lat, this.markerGutmanaCave.long, this.iconCave);
      this.mapComponent.addMarker(this.markerTuraidaCastle.lat, this.markerTuraidaCastle.long, this.iconHill);
      this.mapComponent.addMarker(this.markerFolksongHill.lat, this.markerFolksongHill.long, this.iconCave);
    }

}
