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
    [Route("api/[controller]")]
    [ApiController]
    public class Products : ControllerBase
    {
        ProductRepository _repo;

        public Products()
        {
            _repo = new ProductRepository();
        }

        
        //GET to /api/products
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_repo.GetAll());
        }


        //GET to /api/products/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var product = _repo.Get(id);

            if (product == null)
            {
                return NotFound("This product id does not exist");
            }

            return Ok(product);
        }

        //POST to /api/products
        [HttpPost]
        public IActionResult AddAProduct(Product product)
        {
            _repo.Add(product);
            return Created($"api/Products/{product.id}", product);
        }

        
        [HttpPut("{id}/update")]
        public IActionResult UpdateUser(int id, Product productObj)
        {
            var product = _repo.Get(id);

            product.type_id = productObj.type_id;
            product.price = productObj.price;
            product.title = productObj.title;
            product.description = productObj.description;
            product.quantity = productObj.quantity;

            _repo.Update(product);
            return NoContent();
        }

        //DELETE /api/products/{productId}
        [HttpDelete("{productId}")]
        public IActionResult RemoveProduct(int productId)
        {
            _repo.Remove(productId);

            return Ok();
        }
    }
}
