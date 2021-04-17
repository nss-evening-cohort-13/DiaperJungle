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
    [Route("api/paymenttypes")]
    [ApiController]
    public class PaymentTypesController : ControllerBase
    {
        PaymentTypeRepository _repo;
        public PaymentTypesController()
        {
            _repo = new PaymentTypeRepository();
        }

        //Get to api/paymenttypes
        [HttpGet]
        public IActionResult GetAllPaymentTypes()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/paymenttypes/{id}
        //GET to /api/paymenttypes/2
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var paymentType = _repo.Get(id);
            if (paymentType == null)
            {
                return NotFound("This payment type id does not exist");
            }
            return Ok(paymentType);
        }
    }
}
