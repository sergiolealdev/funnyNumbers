import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Game} from '../game/game';
import {Rankings} from '../rankings/rankings';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class Home {
    constructor(public navCtrl: NavController) {}

  play() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(Game);
  }
  rankings() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(Rankings);
  }

}