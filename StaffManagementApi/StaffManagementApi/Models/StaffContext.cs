using Microsoft.EntityFrameworkCore;

namespace StaffManagementApi.Models
{
    public class StaffContext : DbContext
    {
        public StaffContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Staff> Staffs { get; set; }
    }
}
