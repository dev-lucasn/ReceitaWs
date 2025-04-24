using ReceitaWs.API.Configuration;
using ReceitaWs.API.Extensions;
using ReceitaWs.Application.Settings;
using ReceitaWs.Infrastructure.Seeders;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:5000");

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings"));

builder.AddCorsConfiguration()
    .AddSwaggerConfiguration()
    .AddJwtAuthenticationConfiguration()
    .AddDependencyInjectionConfiguration();

builder.Services.AddControllers();

var app = builder.Build();

app.UseCorsConfiguration();

app.UseAuthentication();
app.UseAuthorization();

app.UseSwaggerConfiguration();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<AdminUserSeeder>();
    await seeder.SeedAsync();
}

app.Run();
