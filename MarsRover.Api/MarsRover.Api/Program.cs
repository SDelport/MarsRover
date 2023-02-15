using MarsRover.Api.Interfaces;
using MarsRover.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "policy",
                      builder =>
                      {
                          builder.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:4200");
                      });
});

builder.Services.AddSingleton(typeof(ILevelProvider), typeof(LevelProviderService));
builder.Services.AddScoped(typeof(ISimulator), typeof(SimulatorService));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("policy");

app.UseAuthorization();

app.MapControllers();

app.Run();
