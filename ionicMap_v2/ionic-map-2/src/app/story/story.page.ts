import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {

  public imgData = [];
  subscription: Subscription;
  
 constructor(private imgService: ImagesService) { 

  // this.activatedRoute.queryParams.subscribe((res)=>{
  //   console.log('PARAMS', res);
  //   this.imgData.push(res);
  // });
}

  ngOnInit() {
    console.log('init story', this.imgData);
    this.subscription = this.imgService.imageList
    .subscribe(
     res => {
        console.log(res, 'SUB RES');
        this.imgData = res;
      }
    )
  }

}
