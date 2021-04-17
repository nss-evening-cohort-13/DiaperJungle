using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.DataAccess;
using DiaperJungle.Models;

namespace DiaperJungle.Controllers
{
    [Route("api/Order_Product")]
    [ApiController]
    public class Order_ProductController : ControllerBase
    {
        Order_ProductRepository _repo;

        public Order_ProductController()
        {
            _repo = new Order_ProductRepository();
        }

        //GET to /api/Order_Product
        [HttpGet]
        public IActionResult GetAllOrder_Products()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/Order_Product/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var order_Product = _repo.Get(id);

            if (order_Product == null)
            {
                return NotFound("This category does not exist");
            }

            return Ok(order_Product);
        }

        //DELETE /api/order_Product/{ProductTypesId}
        [HttpDelete("{productTypeId}")]
        public IActionResult DeleteProductType(int productTypeId)
        {
            _repo.Remove(productTypeId);

            return Ok();
        }

    }
}

