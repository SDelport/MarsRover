using MarsRover.Api.Interfaces;
using MarsRover.Api.Models;
using MarsRover.Api.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace MarsRover.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SimulationController : Controller
    {
        private ISimulator simulator;

        public SimulationController(ISimulator simulatorService)
        {
            this.simulator = simulatorService;
        }

        
        // Not Implemented yet
        [Route("get-level/{levelID}")]
        [HttpGet]
        public LevelResponse GetLevel()
        {
            return new LevelResponse();
        }

        [Route("simulate")]
        [HttpPost]
        public SimulationResponse Simulate(SimulationRequest request)
        {
            SimulationResponse simulationResponse = this.simulator.Simulate(request);
            return simulationResponse;
        }
    }
}
