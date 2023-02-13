namespace MarsRover.Api.Models
{
    public class SimulationRequest
    {
        public int TopX { get; set; }
        public int TopY { get; set; }
        public List<Rover> Rovers { get; set; }
    }
}
