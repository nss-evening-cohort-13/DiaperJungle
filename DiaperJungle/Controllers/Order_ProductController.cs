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
        //GET to /api/Order_Product/{id}
        [HttpGet("fb/{fb_uid}")]
        public IActionResult GetCartByFBUid(string fb_uid)
        {
            var order_Product = _repo.GetCartByFBUid(fb_uid);

            if (order_Product == null)
            {
                return NotFound("Cart is empty");
            }

            return Ok(order_Product);
        }

        //GET to /api/order_product/order/{id}
        [HttpGet("order/{orderId}")]
        public IActionResult GetAllOrder_ProductsOfAnOrder(int orderId)
        {
            return Ok(_repo.GetAllProductsOfAnOrder(orderId));
        }

        //DELETE /api/order_Product/{ProductTypesId}
        [HttpDelete("{productTypeId}")]
        public IActionResult DeleteProductType(int productTypeId)
        {
            _repo.Remove(productTypeId);

            return Ok();
        }

        //POST
        [HttpPost]
        public IActionResult AddAnOrder(Order_Product order_product)
        {
            _repo.Add(order_product);
            return Created($"api/orders/{order_product.id}", order_product);
        }
    }
}

