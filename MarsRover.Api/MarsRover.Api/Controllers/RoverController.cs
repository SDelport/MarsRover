using MarsRover.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace MarsRover.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoverController : Controller
    {
        [HttpPost]
        [Route("Simulation")]
        public SimulationResponse Simulation(SimulationRequest request)
        {
            SimulationResponse simulationResponse = new SimulationResponse();

            string directions = "NESW";

            //Modifiers for each direction mapped to directions variable
            int[] directionModifiersX = new int[] { 0, 1, 0, -1 };
            int[] directionModifiersY = new int[] { 1, 0, -1, 0 };

            //Simulation
            foreach (var rover in request.Rovers)
            {
                RoverPath path = new RoverPath();

                char currentDirection = rover.Direction;
                (int x, int y) currentPosition = (rover.X, rover.Y);


                foreach (var instruction in rover.Instruction)
                {
                    int directionIndex = directions.IndexOf(currentDirection);

                    //Handle Right
                    if (instruction == 'R')
                    {
                        directionIndex += 1;
                    }

                    //Handle Left
                    if (instruction == 'L')
                    {
                        directionIndex -= 1;
                    }

                    //Loop Left
                    if (directionIndex < 0)
                    {
                        directionIndex += 4;
                    }

                    //The Modulus handles Loop right
                    currentDirection = directions[directionIndex % 4];

                    if (instruction == 'M')
                    {
                        currentPosition.x += directionModifiersX[directionIndex];
                        currentPosition.y += directionModifiersY[directionIndex];
                    }

                    //Value types, so no issue with references
                    path.RoverHistory.Add(new Rover()
                    {
                        Direction = currentDirection,
                        X = currentPosition.x,
                        Y = currentPosition.y,
                    });
                }

              simulationResponse.RoverPaths.Add(path);
            }

            return simulationResponse;
        }
    }
}
