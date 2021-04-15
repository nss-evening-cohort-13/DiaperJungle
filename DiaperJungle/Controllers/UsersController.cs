using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.Models;
using DiaperJungle.DataAccess;

namespace DiaperJungle.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepository _repo;
        public UsersController()
        {
            _repo = new UserRepository();
        }

        //Get to api/users
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/users/{id}
        //GET to /api/users/4
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _repo.Get(id);
            if (user == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(user);
        }

        //POST to /api/users
        [HttpPost]
        public IActionResult AddAUser(User user)
        {
            _repo.Add(user);
            return Created($"api/Loaves/{user.id}", user);
        }

        //DELETE to /api/users/{userId}
        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            _repo.Remove(userId);
            return Ok();
        }
    }
}