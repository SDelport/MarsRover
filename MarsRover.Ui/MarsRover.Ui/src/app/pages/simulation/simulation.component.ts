import { Component } from '@angular/core';
import { Rover } from 'src/app/classes/rover';
import { Simulation } from 'src/app/classes/simulation';
import { RoverService } from 'src/app/services/rover.service';


@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent {

  topX = 5;
  topY = 5;
  loading = false;
  output = "";

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

  simulationRovers: Rover[] = [];

  constructor(private roverService: RoverService) {
  }


  addRover() {
    this.inputRovers.push(new Rover());
  }

  runSimulation() {
    this.loading = true;
    this.output = "";

    let simulation = new Simulation(this.topX, this.topY, this.inputRovers);

    this.roverService.runSimulation(simulation).subscribe((result: any) => {
      this.loading = false;
      for (let path of result.roverPaths) {
        let finalPoint = path.roverHistory[path.roverHistory.length - 1];
        this.output += `${finalPoint.x} ${finalPoint.y} ${finalPoint.direction}\n`;
      }
    },
      (error) => {
        this.loading = false;
      });
  }

}
