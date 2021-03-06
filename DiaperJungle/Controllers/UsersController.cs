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
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepository _repo;
        public UsersController()
        {
            _repo = new UserRepository();
        }

        //Get to api/Users
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/Users/{id}
        //GET to /api/Users/4
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

        [HttpGet("fb/{fb_uid}")]
        public IActionResult GetUserByFBUid(string fb_uid)
        {
            var user = _repo.GetByFBUid(fb_uid);
            if (user == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(user);
        }

        //POST to /api/Users
        [HttpPost]
        public IActionResult AddAUser(User user)
        {
            _repo.Add(user);
            return Created($"api/Loaves/{user.id}", user);
        }

        //DELETE to /api/Users/{userId}
        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            _repo.Remove(userId);
            return Ok();
        }

        //PUT to /api/User/{id}/update
        [HttpPut("{id}/update")]
        public IActionResult UpdateUser(int id, User userObj)
        {
            var user = _repo.Get(id);

            user.first_name = userObj.first_name;
            user.last_name = userObj.last_name;
            user.username = userObj.username;
            user.password = userObj.password;
            user.is_admin = userObj.is_admin;

            _repo.Update(user);
            return NoContent();
        }
    }
}