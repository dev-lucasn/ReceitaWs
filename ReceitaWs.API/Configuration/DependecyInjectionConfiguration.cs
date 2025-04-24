using Microsoft.EntityFrameworkCore;
using ReceitaWs.Application.Interfaces;
using ReceitaWs.Application.Services;
using ReceitaWs.Core.Interfaces;
using ReceitaWs.Infrastructure.DbContext;
using ReceitaWs.Infrastructure.Repositories;
using ReceitaWs.Infrastructure.Seeders;

namespace ReceitaWs.API.Configuration
{
    public static class DependecyInjectionConfiguration
    {
        public static WebApplicationBuilder AddDependencyInjectionConfiguration(this WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddScoped<AdminUserSeeder>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<ITokenService, TokenService>();
            return builder;
        }
    }
}