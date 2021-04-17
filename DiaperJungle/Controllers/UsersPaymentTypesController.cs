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
    [Route("api/userspaymenttypes")]
    [ApiController]
    public class UsersPaymentTypesController : ControllerBase
    {
        UserPaymentTypeRepository _repo;

        public UsersPaymentTypesController()
        {
            _repo = new UserPaymentTypeRepository();
        }

        //GET to /api/userspaymenttypes
        [HttpGet]
        public IActionResult GetAllUserPaymentTypes()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/userspaymenttypes/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var order = _repo.Get(id);

            if (order == null)
            {
                return NotFound("Not found");
            }

            return Ok(order);
        }

        [HttpDelete("{Id}")]
        public IActionResult DeleteUserPaymentType(int id)
        {
            _repo.Remove(id);

            return Ok();
        }
    }
}
