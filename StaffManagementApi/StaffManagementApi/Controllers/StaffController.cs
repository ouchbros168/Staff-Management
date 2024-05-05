using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaffManagementApi.Models;

namespace StaffManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly StaffContext _context;

        public StaffController(StaffContext context)
        {
            _context = context;
        }

        // GET: api/Staff
        [HttpGet]
        public async Task<IActionResult> GetStaffs()
        {
            var staffs = await _context.Staffs.ToListAsync();
            return Ok(new { data = staffs, message = "Staffs retrieved successfully." });
        }
        // GET: api/Staff/Search
        [HttpGet("Search")]
        public async Task<IActionResult> SearchStaffs(string? staffId, int? gender, DateTime? fromDate, DateTime? toDate)
        {
            var query = _context.Staffs.AsQueryable();

            if (!string.IsNullOrEmpty(staffId))
            {
                query = query.Where(s => s.StaffId.Contains(staffId));
            }

            if (gender.HasValue)
            {
                query = query.Where(s => s.Gender == gender.Value);
            }

            if (fromDate.HasValue)
            {
                query = query.Where(s => s.BirthDay >= fromDate.Value.Date);
            }

            if (toDate.HasValue)
            {
                // Add 1 day to include the end of the specified date range
                query = query.Where(s => s.BirthDay <= toDate.Value.Date.AddDays(1));
            }

            var staffs = await query.ToListAsync();

            return Ok(new { data = staffs, message = "Staffs retrieved successfully." });
        }


        // GET: api/Staff/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStaff(int id)
        {
            var staff = await _context.Staffs.FindAsync(id);
            if (staff == null)
            {
                return NotFound(new { data = staff, message = "Staff not found." });
            }
            return Ok(new { data = staff, message = "Staff retrieved successfully." });
        }

        // PUT: api/Staff/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStaff(int id, Staff staff)
        {
           
            if (id != staff.Id)
            {
                return BadRequest(new { data = staff, message = "Invalid staff ID." });
            }

            _context.Entry(staff).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { data = staff, message = "Staff updated successfully." });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(id))
                {
                    return NotFound(new { data = staff, message = "Staff not found." });
                }
                else
                {
                    throw;
                }
            }
            
        }

        // POST: api/Staff
        [HttpPost]
        public async Task<IActionResult> PostStaff(Staff staff)
        {
            if (staff == null)
            {
                return BadRequest(new { data = staff, message = "Invalid staff data." });
            }
            _context.Staffs.Add(staff);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStaff), new { id = staff.Id }, new { data = staff, message = "Staff created successfully." });
        }

        // DELETE: api/Staff/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var staff = await _context.Staffs.FindAsync(id);
            if (staff == null)
            {
                return NotFound(new { data = staff, message = "Staff not found." });
            }

            _context.Staffs.Remove(staff);
            await _context.SaveChangesAsync();

            return Ok(new { data = staff, message = "Staff deleted successfully." });
        }

        private bool StaffExists(int id)
        {
            return _context.Staffs.Any(e => e.Id == id);
        }
    }
}
