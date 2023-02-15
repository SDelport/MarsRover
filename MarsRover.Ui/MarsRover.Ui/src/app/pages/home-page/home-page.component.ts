import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  roverX = 2;
  roverY = 3;
  roverDirection = 'N';
  gridSize = 50;
  gridWidth = 10;
  gridHeight = 10;

  directions = 'NWSE';
  directionModifiersX = [0, -1, 0, 1];
  directionModifiersY = [-1, 0, 1, 0];

  moveMilliseconds = 500;

  constructor(private router: Router) {
    this.onResize();
    this.roverX = this.gridWidth/2;
    this.roverY = this.gridHeight/8;
    setInterval(() => this.animateRover(), this.moveMilliseconds);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 1500) {
      this.gridSize = ~~(window.innerWidth / 40);
    }
    else if(window.innerWidth> 1000){
      this.gridSize = ~~(window.innerWidth / 20);
    }
    else {
      this.gridSize = ~~(window.innerWidth / 8);
    }
    this.gridWidth = ~~(window.innerWidth / this.gridSize);
    this.gridHeight = ~~(window.innerHeight / this.gridSize);
  }

  loadLevel(level: number){
    this.router.navigateByUrl("/simulation/1")
  }


  // Logic for homescreen animation
  animateRover() {
    let move = ~~(Math.random() * 10);

    let didMove = false;

    let directionIndex = this.directions.indexOf(this.roverDirection);

    // Weighted random moves
    if (move < 2) {
      directionIndex = (directionIndex + 1) % 4;
      didMove = true;
    }
    else if (move < 4) {
      directionIndex--;
      if (directionIndex < 0) {
        directionIndex += 4;
      }
      didMove = true;
    }
    else {
      this.roverX += this.directionModifiersX[directionIndex];
      this.roverY += this.directionModifiersY[directionIndex];


      didMove = true;

      // Crude bounds 
      if (this.roverX < 0) {
        this.roverX = 0;
        didMove = false;
      }
      if (this.roverY < 0) {
        this.roverY = 0;
        didMove = false;
      }
      if (this.roverX > this.gridWidth - 1) {
        this.roverX = this.gridWidth - 1;
        didMove = false;
      }
      if (this.roverY > this.gridHeight - 1) {
        this.roverY = this.gridHeight - 1;
        didMove = false;
      }
    }


    this.roverDirection = this.directions[directionIndex % 4];




  }
}
