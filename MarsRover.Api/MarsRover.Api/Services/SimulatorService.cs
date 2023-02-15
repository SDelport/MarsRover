using MarsRover.Api.Interfaces;
using MarsRover.Api.Models;
using System.IO;

namespace MarsRover.Api.Services
{
    public class SimulatorService : ISimulator
    {
        public SimulationResponse Simulate(SimulationRequest simulation)
        {
            SimulationResponse simulationResponse = new SimulationResponse();

            //Simulation
            foreach (var rover in simulation.Rovers)
            {
                RoverPath path = SimulateRover(rover, simulation.TopX, simulation.TopY);
                simulationResponse.RoverPaths.Add(path);
            }

            return simulationResponse;
        }

        private RoverPath SimulateRover(Rover rover, int topX, int topY)
        {
            RoverPath path = new RoverPath();

            // Add initial Point
            path.RoverHistory.Add(new Rover()
            {
                X = rover.X,
                Y = rover.Y,
                Direction = rover.Direction,
            });

            foreach (var instruction in rover.Instruction)
            {
                Rover roverSnapshot = ProcessInstruction(ref rover, instruction, topX, topY);
                path.RoverHistory.Add(roverSnapshot);
            }

            return path;
        }

        private Rover ProcessInstruction(ref Rover rover, char instruction, int topX, int topY)
        {
            string directions = "NESW";

            //Modifiers for each direction mapped to directions variable
            int[] directionModifiersX = new int[] { 0, 1, 0, -1 };
            int[] directionModifiersY = new int[] { 1, 0, -1, 0 };

            char currentDirection = rover.Direction;
            (int x, int y) currentPosition = (rover.X, rover.Y);

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
                //Bounding Box
                int newX = currentPosition.x + directionModifiersX[directionIndex];
                int newY = currentPosition.y + directionModifiersY[directionIndex];

                if (newX >= 0 && newX <= topX && newY >= 0 && newY <= topY)
                {
                    currentPosition.x= newX;
                    currentPosition.y= newY;
                }
            }

            rover.X = currentPosition.x;
            rover.Y = currentPosition.y;
            rover.Direction = currentDirection;

            return new Rover()
            {
                Direction = currentDirection,
                X = currentPosition.x,
                Y = currentPosition.y,
            };
        }
    }
}
