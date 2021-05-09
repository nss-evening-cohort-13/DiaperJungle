using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.DataAccess;
using DiaperJungle.Models;
using Dapper;

namespace DiaperJungle.Controllers
{
    [Route("api/Orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        OrderRepository _repo;

        public OrdersController()
        {
            _repo = new OrderRepository();
        }

        //GET to /api/orders
        [HttpGet]
        public IActionResult GetAllOrders()
        {
            return Ok(_repo.GetAll());
        }

        //POST to /api/orders
        [HttpPost]
        public IActionResult AddAnOrder(Order order)
        {
            _repo.Add(order);
            return Created($"api/orders/{order.id}", order);
        }

        //GET to /api/orders/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var order = _repo.Get(id);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            return Ok(order);
        }

        //Delete to /api/orders/{id}
        [HttpDelete("{orderId}")]
        public IActionResult DeleteOrder(int orderId)
        {
            _repo.Remove(orderId);

            return Ok();
        }

<<<<<<< HEAD
        [HttpGet("{fb_uid}/cart")]
        public IActionResult GetOrdersByFBUID(string fb_uid)
        {
            var orders = _repo.GetOrdersByUserId(fb_uid);
            
            foreach(var order in orders)
            {
                if (order.is_complete != true)
                {
                    return Ok(order);
                }
            }

            return NoContent();
=======
        //Get completed user orders
        [HttpGet("history/{fb_uid}")]
        public IActionResult GetAllUserCompletedOrders(string fb_uid)
        {
            return Ok(_repo.GetAllUserOrderHistory(fb_uid));
>>>>>>> main
        }
    }
}
