import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  public imageList: BehaviorSubject<any>;

  public imageItem = [{image:{}, location:{}}];


  constructor() {
    this.imageList = new BehaviorSubject(this.imageItem);
  }

  public addImageItem(newImage){
    console.log( this.imageItem, 'previous image item',newImage);   
    this.pushImage(newImage);  
    
  }
  pushImage(newImage){
    this.imageItem.push(Object.assign({}, newImage));
    console.log('new imageItem from service', this.imageItem);
    this.imageList.next(this.imageItem);
  }
  // Check geolocation
  // if Castle
  // if Cave
  // if Church
}
