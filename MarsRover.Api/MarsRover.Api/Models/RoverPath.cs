namespace MarsRover.Api.Models
{
    public class RoverPath
    {
        public List<Rover> RoverHistory { get; set; }

        public RoverPath()
        {
            this.RoverHistory = new List<Rover>();
        }
    }
}
