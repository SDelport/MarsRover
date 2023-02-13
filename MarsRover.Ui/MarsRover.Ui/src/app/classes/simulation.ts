import { Rover } from "./rover";

export class Simulation{
    topX; 
    topY;
    rovers;

    constructor(topX:number,topY:number,rovers: Rover[]){
        this.topX = topX;
        this.topY = topY;
        this.rovers = rovers;
    }
}