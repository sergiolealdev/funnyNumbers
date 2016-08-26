import {Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy  } from '@angular/core';
import {NavController} from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import {Home} from '../home/home'
@Component({
  templateUrl: 'build/pages/game/game.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Game {
  private items = [1, 2, 3, 4];
  private rows: number = 4;
  private cols: number = 4;
  private principal: boolean[][];
  private paths: string[][];
  private numbers: number[][];
  private opened: boolean[][];
  private firstTryX: number;
  private firstTryY: number;
  private secondTryX: number;
  private secondTryY: number;
  private timer: Observable<number>;
  private counter = 0;
  private firstNumberOpened: boolean;
  private secondNumberOpened: boolean;
  private attempts: number;
  private width: number;
  private height: number;
  private subscription;

  constructor(private navCtrl: NavController, private changeDetector: ChangeDetectorRef) {
    this.initArrayBooleans();
    this.firstTryX = -1;
    this.firstTryY = -1;
    this.secondTryX = -1;
    this.secondTryY = -1;
    this.timer = Observable.timer(0, 1000);
    this.firstNumberOpened = false;
    this.secondNumberOpened = false;
    this.attempts = 0;
  }

  ngOnInit() {
    //console.log(window.innerHeight);
    //console.log(window.innerWidth);
    this.width = window.innerWidth / 4.4;
    this.height = window.innerHeight / 5;
    this.subscription = this.timer.subscribe((v) => {
      this.counter++;
      this.performCheckingNumbers();
      if (this.counter % 2 == 0) {
        this.changeDetector.markForCheck();
      }
    }, null, () => {
      this.changeDetector.markForCheck();
    });
  }

  onResize(event) {
    //console.log(event.target.innerWidth);
    //console.log(event.target.innerHeight);
    this.width = event.target.innerWidth / 4.4;
    this.height = event.target.innerHeight / 5;
  }

  back() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.subscription.unsubscribe();
    
    this.navCtrl.pop(Home);
  }

  private initArrayBooleans() {
    this.principal = [];
    this.paths = [];
    this.numbers = [];
    this.opened = [];

    var arrayCounter = 7;
    var myArray = [1, 2, 3, 4, 5, 6, 7, 8];
    this.shuffle(myArray);

    for (let i = 0; i < this.rows; i++) {
      this.principal[i] = [];
      this.paths[i] = [];
      this.numbers[i] = [];
      this.opened[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.principal[i][j] = true;
        if (arrayCounter == -1) {
          this.shuffle(myArray);
          arrayCounter = 7;
        }
        this.paths[i][j] = "build/images/animals/" + myArray[arrayCounter] + ".png";
        this.numbers[i][j] = myArray[arrayCounter--];
      }
    }
  }

  private open(i, j) {
    if (this.principal[i][j] == false) {
      return;
    }
    if (this.firstNumberOpened == true && this.secondNumberOpened == true) {
      return;
    }

    if (this.firstTryX == -1 && this.firstTryY == -1) {
      this.firstNumberOpened = true;
      this.firstTryX = i;
      this.firstTryY = j;
      this.principal[i][j] = false;
    } else {
      this.secondTryX = i;
      this.secondTryY = j;
      this.principal[i][j] = false;
      this.secondNumberOpened = true;
    }
  }

  private performCheckingNumbers() {
    console.log(this.firstTryX + " " + this.firstTryY + " " + this.secondTryX + " " + this.secondTryY);
    if (this.firstTryX == -1 || this.firstTryY == -1 || this.secondTryX == -1 || this.secondTryY == -1) {
      return;
    }

    if (this.numbers[this.firstTryX][this.firstTryY] != this.numbers[this.secondTryX][this.secondTryY]) {
      this.principal[this.secondTryX][this.secondTryY] = true;
      this.principal[this.firstTryX][this.firstTryY] = true;
    }
    this.firstTryX = -1;
    this.firstTryY = -1;
    this.secondTryX = -1;
    this.secondTryY = -1;
    this.firstNumberOpened = false;
    this.secondNumberOpened = false;
    this.attempts++;
    if (this.isGameFinished()) {

    }

  }
  private isGameFinished(): boolean {
    return true;
  }

  private shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }
}
