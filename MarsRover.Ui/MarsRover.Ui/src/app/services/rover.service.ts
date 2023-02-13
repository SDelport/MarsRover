import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Simulation } from '../classes/simulation';

@Injectable({
  providedIn: 'root'
})
export class RoverService {

  constructor(private httpClient: HttpClient) { }

  runSimulation(simulation: Simulation) {
    return this.httpClient.post('http://localhost:5069/rover/simulation', simulation);
  }
}
