import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public showAnimation = true;
  public showAffectiva = false;

  constructor() { }

  ngOnInit() {
  }
  checkAnswer(){
    this.showAffectiva = true;
    this.showAnimation = false;
  }

}
