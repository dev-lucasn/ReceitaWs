using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ReceitaWs.Core.Entities;
using ReceitaWs.Infrastructure.DbContext;

namespace ReceitaWs.Infrastructure.Seeders
{
    public class AdminUserSeeder
    {
        private readonly AppDbContext _context;

        public AdminUserSeeder(AppDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            if (await _context.Users.AnyAsync(u => u.Role == "admin"))
                return;

            var adminUser = new User()
            {
                Id = Guid.NewGuid(),
                Username = "admin",
                Email = "admin@admin.com",
                Password = Hash("admin123"),
                Role = "admin"
            };
            _context.Users.Add(adminUser);
            await _context.SaveChangesAsync();
        }

        private string Hash(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            return Convert.ToBase64String(sha.ComputeHash(bytes));
        }
    }
}