import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.scss']
})
export class RoverComponent implements OnChanges {
  @Input("x")
  x: number = 0;

  @Input("y")
  y: number = 0;

  @Input("gridSize")
  gridSize: number = 40;

  @Input("direction")
  direction: string = "N";

  @Input("moveTime")
  moveTime: string = ".2";

  @Input("trailLength")
  trailLength: number = 10;

  trail: { x: number, y: number, rotation: number }[] = [];

  rotation: number = 0;

  directions = "NESW";

  ngOnChanges(changes: any) {

    // CSS doesn't animate from 270 to 0 the right way so this is needed
    if (changes.direction) {
      this.handleRotation(changes);
    }

    if (this.trailLength > 0) {
      if (changes.x) {
        this.trail.push({ x: changes.x.currentValue, y: this.y, rotation: this.rotation });
      }

      if (changes.y) {
        this.trail.push({ x: this.x, y: changes.y.currentValue, rotation: this.rotation });
      }

      if (this.trail.length > this.trailLength) {
        this.trail.shift();
      }
    }
    console.log(this.trail);
  }

  handleRotation(changes: any) {
    let oldIndex = this.directions.indexOf(changes.direction.previousValue);
    let newIndex = this.directions.indexOf(changes.direction.currentValue);

    if (!changes.direction.previousValue) {
      this.rotation = newIndex * 90;
    }
    else {
      let turningLeft = oldIndex > newIndex;

      if (oldIndex == 0 && newIndex == 3) {
        turningLeft = true;
      }

      if (oldIndex == 3 && newIndex == 0) {
        turningLeft = false;
      }

      if (turningLeft) {
        this.rotation -= 90;
      }
      else {
        this.rotation += 90;
      }
    }
  }
}
