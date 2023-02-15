import { Component, HostListener } from '@angular/core';
import { Rover } from 'src/app/classes/rover';
import { Simulation } from 'src/app/classes/simulation';
import { SimulationService } from 'src/app/services/simulation.service';


@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent {

  topX = 5;
  topY = 5;
  loading = false;
  simulating = false;
  moveTime = 500;
  output = "";

  gridSize = 50;

  inputRovers: Rover[] = [
    {
      direction: "N",
      x: 1,
      y: 2,
      instruction: "LMLMLMLMM"
    },
    {
      direction: "E",
      x: 3,
      y: 3,
      instruction: "MMRMMRMRRM"
    }
  ];

  constructor(private simulationService: SimulationService) {
    this.updateSimulation();
  }

  addRover() {
    this.inputRovers.push(new Rover());
  }

  runSimulation() {
    this.loading = true;
    this.output = "";

    let simulation = new Simulation(this.topX, this.topY, this.inputRovers);

    this.simulating = true;

    this.simulationService.runSimulation(simulation).subscribe((result: any) => {
      this.loading = false;

      let offset = 0;

      for (let pathIndex = 0; pathIndex < result.roverPaths.length; pathIndex++) {
        let path = result.roverPaths[pathIndex];

        // Animate it, crudely
        let matchedRover = this.inputRovers.find(rover => rover.x == path.roverHistory[0].x && rover.y == path.roverHistory[0].y);
        for (let i = 0; i < path.roverHistory.length; i++) {
          setTimeout(() => {
            if (matchedRover) {
              matchedRover.x = path.roverHistory[i].x;
              matchedRover.y = path.roverHistory[i].y;
              matchedRover.direction = path.roverHistory[i].direction;
            }
          }, this.moveTime * (i + offset - 1));
        }

        offset += path.roverHistory.length;

        let finalPoint = path.roverHistory[path.roverHistory.length - 1];
        this.output += `${finalPoint.x} ${finalPoint.y} ${finalPoint.direction}\n`;
      }
    },
      (error) => {
        this.loading = false;
      });
  }

  updateSimulation() {
    this.topX = Number(this.topX);
    this.topY = Number(this.topY);

    this.resize();
  }

  @HostListener('window:resize', ['$event'])
  resize() {
    let cellSizeX = (window.innerWidth - 300) / (this.topX + 1);
    let cellSizeY = window.innerHeight / (this.topY + 1);

    // Pick smaller one
    this.gridSize = cellSizeX > cellSizeY ? cellSizeY : cellSizeX;
  }

  getGridWidth() {
    return `${(this.gridSize * (this.topX + 1))} px`;
  }
}
