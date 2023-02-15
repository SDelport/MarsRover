import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Simulation } from '../classes/simulation';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor(private httpClient: HttpClient) { }

  runSimulation(simulation: Simulation) {
    return this.httpClient.post('http://localhost:5069/simulation/simulate', simulation);
  }
}
