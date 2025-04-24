using Microsoft.EntityFrameworkCore;
using ReceitaWs.Core.Entities;

namespace ReceitaWs.Infrastructure.DbContext
{
    public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        
        public DbSet<User> Users => Set<User>();
        public DbSet<Company> Companies => Set<Company>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
            
            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.UserId).IsRequired();
                entity.Property(e => e.Cnpj).IsRequired();
                entity.Property(e => e.CorporateName).IsRequired();
                entity.Property(e => e.TradeName).IsRequired();
                entity.Property(e => e.Status).IsRequired();
                entity.Property(e => e.OpeningDate).IsRequired();
                entity.Property(e => e.Type).IsRequired();
                entity.Property(e => e.LegalNature).IsRequired();
                entity.Property(e => e.MainActivity).IsRequired();
                entity.Property(e => e.Street).IsRequired();
                entity.Property(e => e.Number).IsRequired();
                entity.Property(e => e.Neighborhood).IsRequired();
                entity.Property(e => e.City).IsRequired();
                entity.Property(e => e.State).IsRequired();
                entity.Property(e => e.ZipCode).IsRequired();
            });
        }
    }
}