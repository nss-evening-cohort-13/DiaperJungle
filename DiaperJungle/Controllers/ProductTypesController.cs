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

        //GET to /api/ProductTypes
        [HttpGet]
        public IActionResult GetAllProductTypes()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/ProductTypes/{id}
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

        //POST to /api/ProductsTypes
        [HttpPost]
        public IActionResult AddAProductType(ProductType productType)
        {
            _repo.Add(productType);
            return Created($"api/ProductTypes/{productType.id}", productType);
        }

        //DELETE /api/ProductType/{ProductTypesId}
        [HttpDelete("{productTypeId}")]
        public IActionResult DeleteProductType(int productTypeId)
        {
            _repo.Remove(productTypeId);

            return Ok();
        }

        //PUT to /api/{ProductTypesId}/update
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
