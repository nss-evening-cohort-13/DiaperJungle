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
    [Route("api/PaymentTypes")]
    [ApiController]
    public class PaymentTypesController : ControllerBase
    {
        PaymentTypeRepository _repo;
        public PaymentTypesController()
        {
            _repo = new PaymentTypeRepository();
        }

        //Get to api/PaymentTypes
        [HttpGet]
        public IActionResult GetAllPaymentTypes()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/PaymentTypes/{id}
        //GET to /api/PaymentTypes/4
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

        //POST to /api/PaymentTypes
        [HttpPost]
        public IActionResult AddAPaymentType(PaymentType paymentType)
        {
            _repo.Add(paymentType);
            return Created($"api/PaymentTypes/{paymentType.id}", paymentType);
        }

        //GET User payment types
        //GET URL /api/userPayments/6
        [HttpGet("userPayments/{user_id}")]
        public IActionResult GetUserPaymentTypes(int user_id)
        {
            var payment = _repo.GetUserPayments(user_id);
            if (payment == null)
            {
                return NotFound("This customer has no payments");
            }
            return Ok(payment);
        }

        //DELETE to /api/PaymentType/{payment_id}
        [HttpDelete("{payment_id}")]
        public IActionResult DeletePaymentType(int payment_id)
        {
            _repo.Remove(payment_id);
            return Ok();
        }
    }
}
