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
    [Route("api/ProductTypes")]
    [ApiController]
    public class ProductTypesController : ControllerBase
    {
        ProductTypeRepository _repo;

        public ProductTypesController()
        {
            _repo = new ProductTypeRepository();
        }
        //get all
        [HttpGet]
        public IActionResult GetAllProductTypes()
        {
            return Ok(_repo.GetAll());
        }
        //get single
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var productType = _repo.Get(id);

            if (productType == null)
            {
                return NotFound("This category does not exist");
            }

            return Ok(productType);
        }

        //post
        [HttpPost]
        public IActionResult AddAProductType(ProductType productType)
        {
            _repo.Add(productType);
            return Created($"api/ProductTypes/{productType.id}", productType);
        }

        //delete
        [HttpDelete("{productTypeId}")]
        public IActionResult DeleteProductType(int productTypeId)
        {
            _repo.Remove(productTypeId);

            return Ok();
        }

        //update
        [HttpPut("{id}/update")]
        public IActionResult UpdateProductType(int id, ProductType newCategory)
        {
            var productType = _repo.Get(id);

            productType.category = newCategory.category;

            _repo.Update(productType);

            return NoContent();
        }
    }
}
