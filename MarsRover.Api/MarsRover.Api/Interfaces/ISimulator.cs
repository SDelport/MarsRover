using MarsRover.Api.Models;

namespace MarsRover.Api.Interfaces
{
    public interface ISimulator
    {
        public SimulationResponse Simulate(SimulationRequest simulation);
    }
}
