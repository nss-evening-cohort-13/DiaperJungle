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
    [Route("api/AnimalTypes")]
    [ApiController]
    public class AnimalTypesController : ControllerBase
    {
        AnimalTypeRepository _repo;
        public AnimalTypesController()
        {
            _repo = new AnimalTypeRepository();
        }
        //GET to /api/AnimalTypes
        [HttpGet]
        public IActionResult GetAllProductTypes()
        {
            return Ok(_repo.GetAll());
        }
        //GET to /api/AnimalTypes/{id}
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
        //POST to /api/AnimalTypes
        [HttpPost]
        public IActionResult AddAProductType(AnimalType animalType)
        {
            _repo.Add(animalType);
            return Created($"api/AnimalTypes/{animalType.id}", animalType);
        }
        //DELETE /api/AnimalTypes/{AnimalTypesId}
        [HttpDelete("{animalTypeId}")]
        public IActionResult DeleteProductType(int animalTypeId)
        {
            _repo.Remove(animalTypeId);
            return Ok();
        }
        //PUT to /api/{AnimalTypesId}/update
        [HttpPut("{id}/update")]
        public IActionResult UpdateProductType(int id, AnimalType newCategory)
        {
            var animalType = _repo.Get(id);
            animalType.animal_category = newCategory.animal_category;
            _repo.Update(animalType);
            return NoContent();
        }
    }
}
