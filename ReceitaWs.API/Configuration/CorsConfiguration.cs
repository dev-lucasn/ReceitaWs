namespace ReceitaWs.API.Extensions
{
    public static class CorsConfiguration
    {
        public static WebApplicationBuilder AddCorsConfiguration(this WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            return builder;
        }

        public static WebApplication UseCorsConfiguration(this WebApplication app)
        {
            app.UseCors("AllowAll");
            return app;
        }
    }
}
