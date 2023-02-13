# MarsRover
## Description 
This is a implementation of the coding challenge by google which can be found here: https://code.google.com/archive/p/marsrovertechchallenge/

It was done for a technical assessment.

It consists of an API which is a barebones Asp.NET Core application and and a UI built in angular

##Installation:
Clone the repo and follow the steps below:

###Api:
Stored in the folder MarsRover.Api, this is a Visual Studio project and contains the SLN, restore nuget packages and it will run.

###UI:
Stored in MarsRover.Ui, this was done in Visual Studio code and there are no workspace files, open the root of the folder in terminal and run:
`npm i`

after the packages have installed run
`ng serve` 
to debug locally


Todos:
Implement a service with the logic
Finish Implementing the simulation
Bound the plateau (can go out of range)
Build collision with rovers
Validate input
Error Handling
Spruce up UI


Ideas:
Simultaneous rover simulations?
Gameify?

