using API;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
var app = builder.Build();

app.UseMiddleware<ExceptionMiddlware>();

//CQRS : command query responsibility segregation / none of the commamds are gonna return a value
//Golden Hammer : abstraction of the perfect patter to solve every problem possible
//we use mediator

// Configure the HTTP request pipeline. or often caled middleware
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

//middlware : is the logic between the request and generating the response pipline
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during the migration");
}

app.Run();
