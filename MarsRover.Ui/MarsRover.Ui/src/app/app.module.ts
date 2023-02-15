import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RoverComponent } from './components/rover/rover.component';

@NgModule({
  declarations: [
    AppComponent,
    SimulationComponent,
    HomePageComponent,
    RoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
