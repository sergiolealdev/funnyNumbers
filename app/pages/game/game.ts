import {Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy  } from '@angular/core';
import {NavController} from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
@Component({
  templateUrl: 'build/pages/game/game.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Game {
  private items = [1,2,3,4];
  private rows:number = 4;
  private cols:number = 4;
  private principal: boolean[][];
  private paths: string[][];
  private numbers: number[][];
  private opened:boolean[][];
  private firstTryX:number;
  private firstTryY:number;
  private secondTryX:number;
  private secondTryY:number;
  private timer: any;
  private items2: Observable<number>;
  private counter = 0;

  constructor(private navCtrl: NavController, private changeDetector: ChangeDetectorRef) {
    this.initArrayBooleans();
    this.firstTryX = -1;
    this.firstTryY = -1;
    this.secondTryX = -1;
    this.secondTryY = -1;
    this.items2 = Observable.timer(0, 1000);

  }

  ngOnInit() {
    console.log("empezamos");
    this.items2.subscribe((v) => {
      console.log('got value', v);
      this.counter++;
      this.performCheckingNumbers();
      if (this.counter % 2 == 0) {
        this.changeDetector.markForCheck();
      }
    }, null, () => {
      this.changeDetector.markForCheck();
    });
  }

  private initArrayBooleans(){
    this.principal = [];
    this.paths = [];
    this.numbers = [];
    this.opened = [];
    
    var arrayCounter=7;
    var myArray = [1,2,3,4,5,6,7,8];
    this.shuffle(myArray);     
    
    for(let i=0;i<this.rows;i++){
      this.principal[i] = [];
      this.paths[i] = [];
      this.numbers[i] = [];
      this.opened[i] = [];
      for(let j=0;j<this.cols;j++){
        this.principal[i][j] = true;
        if(arrayCounter==-1){
          this.shuffle(myArray);  
          arrayCounter=7;
        }
        this.paths[i][j]="build/images/" + myArray[arrayCounter] + ".png";
        this.numbers[i][j]=myArray[arrayCounter--];
      }    
    }
  }

  private open (i,j){
    if(this.principal[i][j] = false)
      return;
    if(this.firstTryX == -1 && this.firstTryY == -1){
      this.firstTryX = i;
      this.firstTryY = j;
      this.principal[i][j] = false;
      console.log(1);
    }else{
      this.secondTryX = i;
      this.secondTryY = j;
      this.principal[i][j] = false;
      console.log(2);
    }
}

  private performCheckingNumbers(){
    if(this.firstTryX == -1 || this.firstTryY == -1 || this.secondTryX == -1 || this.secondTryY == -1){
      return;
    }
    
    if(this.numbers[this.firstTryX][this.firstTryY] == this.numbers[this.secondTryX][this.secondTryY]){
      this.firstTryX == -1;
      this.firstTryY == -1;
      this.secondTryX == -1;
      this.secondTryY == -1;
      console.log(3);
    }else{
      console.log(4);
      
      
      this.principal[this.secondTryX][this.secondTryY]=true;
      this.principal[this.firstTryX][this.firstTryY]=true;
      this.firstTryX = -1;
      this.firstTryY = -1;
      this.secondTryX = -1;
      this.secondTryY = -1;
      console.log(5);
    }
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
