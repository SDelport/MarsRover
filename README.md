# MarsRover
## Description 
This was done as a technical assessment and is an implementation of: https://code.google.com/archive/p/marsrovertechchallenge/

It consists of an API that is a barebones .Net Core application and a UI built with Angular

## Instalation and debugging

### Pre-requisites:
* git
* npm 
* Visual Studio

To debug the application or to run it locally, clone this repo and follow the steps below:

### API
The API is located in the MarsRover.Api folder and was created with Visual Studio, the project contains the solution file to open, restore the nuget packages and it can be debugged.

### UI
The UI is located in the MarsRover.Ui folder and is an angular project, open the folder in a terminal of your choice and run:

`npm install`

After the packages have been installed, you can run:

`ng serve`

and the application will run on http://localhost:4200

## Todos

* Better Animation Handling
* Mobile Compatibility for simulation screen
* Object Calisthenics
* Level Select
* Sandbox
* Different Services for different simulations
* Different Rover Types
* Better UI for simulation
* Implement Settings for deployments