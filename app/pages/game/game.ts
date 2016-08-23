import {Component } from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/game/game.html',
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

  constructor(private navCtrl: NavController) {
    this.initArrayBooleans();
    this.firstTryX = -1;
    this.firstTryY = -1;
    this.secondTryX = -1;
    this.secondTryY = -1;
    

  }
  private onInit(){
setInterval(this.checkMatch(), 1000);
  }

  private checkMatch(){
      console.log(new Date().toLocaleTimeString());
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
      if(this.numbers[this.firstTryX][this.firstTryY] == this.numbers[this.secondTryX][this.secondTryY]){
        this.firstTryX == -1;
        this.firstTryY == -1;
        console.log(3);
      }else{
        console.log(4);
        
        this.wait(2000);
        this.principal[i][j]=true;
        this.principal[this.firstTryX][this.firstTryY]=true;
        this.firstTryX = -1;
        this.firstTryY = -1;
        this.secondTryX = -1;
        this.secondTryY = -1;
        console.log(5);
      }
    }
    console.log(i + " " + j);
}

private  wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
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
