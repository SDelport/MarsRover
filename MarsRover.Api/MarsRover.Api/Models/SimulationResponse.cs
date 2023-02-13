namespace MarsRover.Api.Models
{
    public class SimulationResponse
    {
        public List<RoverPath> RoverPaths { get; set; }

        public SimulationResponse()
        {
            this.RoverPaths = new List<RoverPath>();
        }
    }
}
