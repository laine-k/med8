import { Component, Input, Renderer2, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';

const { Geolocation, Network } = Plugins;

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapsComponent {

    @Input('apiKey') apiKey: string;

    public map: any;
    public markers: any[] = [];
    private mapsLoaded: boolean = false;
    private networkHandler = null;

    // marker vars
    private iconCastle = '../../../assets/icon/castle.png';
    private iconCave = '../../../assets/icon/cave.png';
    private iconHill = '../../../assets/icon/church.png';
    private markerGutmanaCave = {lat:57.176364, long:24.842824};
    private markerTuraidaCastle = {lat:57.182835, long:24.850292};    
    private markerFolksongHill = {lat:57.183948, long:24.853241};
    private textCave = 'The Tragic End - Gutmana Cave';
    private textCastle = 'The story begins...Turaida Castle';
    private textChurch = 'Oldest Wooden Church and roses over grave';

    

    constructor(
        private renderer: Renderer2,
        private element: ElementRef,
        @Inject(DOCUMENT) private _document){

    }

    ngOnInit(){

        this.init().then((res) => {
            console.log("Google Maps ready.");
            this.addRouteMarkers();
        }, (err) => {    
            console.log(err);
        });

    }

    private init(): Promise<any> {

        return new Promise((resolve, reject) => {

            this.loadSDK().then((res) => {

                this.initMap().then((res) => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });

            }, (err) => {

                reject(err);

            });

        });

    }

    private loadSDK(): Promise<any> {

        console.log("Loading Google Maps SDK");

        return new Promise((resolve, reject) => {

            if(!this.mapsLoaded){

                Network.getStatus().then((status) => {

                    if(status.connected){

                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });

                    } else {

                        if(this.networkHandler == null){

                            this.networkHandler = Network.addListener('networkStatusChange', (status) => {

                                if(status.connected){

                                    this.networkHandler.remove();

                                    this.init().then((res) => {
                                        console.log("Google Maps ready.")
                                    }, (err) => {    
                                        console.log(err);
                                    });

                                }

                            });

                        }

                        reject('Not online');
                    }

                }, (err) => {

                    // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                    if(navigator.onLine){

                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });

                    } else {
                        reject('Not online');
                    }

                });

            } else {
                reject('SDK already loaded');
            }

        });


    }

    private injectSDK(): Promise<any> {

        return new Promise((resolve, reject) => {

            window['mapInit'] = () => {
                this.mapsLoaded = true;
                resolve(true);
            }

            let script = this.renderer.createElement('script');
            script.id = 'googleMaps';

            if(this.apiKey){
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            } else {
                script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';       
            }

            this.renderer.appendChild(this._document.body, script);

        });

    }

    private initMap(): Promise<any> {

        return new Promise((resolve, reject) => {

            Geolocation.getCurrentPosition().then((position) => {

                console.log(position);
                let latLng = new google.maps.LatLng(this.markerTuraidaCastle.lat, this.markerTuraidaCastle.long);
                // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                let mapOptions = {
                    center: latLng,
                    zoom: 15
                };

                this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
                resolve(true);

            }, (err) => {

                reject('Could not initialise map');

            });

        });

    }

    public addMarker(lat: number, lng: number, icon, content): void {

        let latLng = new google.maps.LatLng(lat, lng);

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            icon:icon
        });
        console.log('add marker called again', lat, lng);

        this.markers.push(marker);
        //let content = "<h4>Information!</h4>";          

    this.addInfoWindow(marker, content);

    }
    addInfoWindow(marker, content){

        let infoWindow = new google.maps.InfoWindow({
          content: content
        });
    
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });
    
    }
    addRouteMarkers(){
        this.addMarker(this.markerGutmanaCave.lat, this.markerGutmanaCave.long, this.iconCave, this.textCave);
        this.addMarker(this.markerTuraidaCastle.lat, this.markerTuraidaCastle.long, this.iconCastle, this.textCastle);
        this.addMarker(this.markerFolksongHill.lat, this.markerFolksongHill.long, this.iconHill, this.textChurch);
    }
}
