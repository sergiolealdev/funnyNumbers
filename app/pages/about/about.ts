import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Home} from '../home/home';

@Component({
  templateUrl: 'build/pages/about/about.html'
})

export class About {
    constructor(public navCtrl: NavController) {}

  back() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.pop(Home);
  }

}