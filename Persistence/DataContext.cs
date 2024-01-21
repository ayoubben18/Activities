using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options)
        : base(options) { }

    public DbSet<Activity> Activities { get; set; }
    public DbSet<ActivityAttenddee> Attendees { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttenddee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));
        builder
            .Entity<ActivityAttenddee>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Activities)
            .HasForeignKey(aa => aa.AppUserId);
        builder
            .Entity<ActivityAttenddee>()
            .HasOne(u => u.Activity)
            .WithMany(a => a.Attenddees)
            .HasForeignKey(aa => aa.ActivityId);
    }
}
