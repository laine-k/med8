import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@Component({
  selector: 'app-emotion-happy',
  templateUrl: './emotion-happy.component.html',
  styleUrls: ['./emotion-happy.component.scss'],
})
export class EmotionHappyComponent implements OnInit {

  private selectedEmotions: Array<string> = [];

  constructor() { }

  @ViewChild('videoHappy') video; 

  ngOnInit() { }
  selectEmotion(event, emo:string){
    const isSelected = event.target.classList.contains('selected');
    if(isSelected){
      event.target.classList.remove('selected');
      const removeItem = this.selectedEmotions.indexOf(emo);
      this.selectedEmotions.splice(removeItem);      
    }
    else{
      this.selectedEmotions.push(emo);
      event.target.classList.add('selected');
    }
    console.log(this.selectedEmotions);
  }
  playVideo(){
    this.video.nativeElement.play();
    console.log(this.video.nativeElement, 'play video');
  }
  pauseVideo(){
    this.video.nativeElement.pause();
    console.log(this.video.nativeElement, 'pause video');
  }
  checkAnswer(){
    
  }
}
