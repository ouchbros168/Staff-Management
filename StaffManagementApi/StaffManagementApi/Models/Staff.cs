using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StaffManagementApi.Models
{
    public class Staff
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(8)]
        [Column(TypeName = "nchar(8)")]
        public string StaffId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime BirthDay { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int Gender { get; set; }
    }

    public enum GenderType
    {
        Male,
        Female
    }
}
