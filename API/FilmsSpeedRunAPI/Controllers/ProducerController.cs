using BLL.DTO;
using BLL.Services;
using DAL.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsSpeedRunAPI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class ProducerController : Controller
    {
        ProducerService service;
        public ProducerController(FilmContext context)
        {
            service = new ProducerService(context);
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Test(int i)
        {
            return Ok();
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] ProducerDTO producer)
        {
            if (producer == null)
                return BadRequest(new { error = "no actor" });
            await service.AddAsync(producer);
            return Ok();
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(int producerId)
        {
            if (producerId == null || producerId == 0)
                return BadRequest(new { error = "no actor id" });
            await service.RemoveAsync(producerId);
            return Ok();
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] ProducerDTO producer)
        {
            if (producer == null)
                return BadRequest(new { error = "no actor" });
            await service.UpdateAsync(producer);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int producerId)
        {
            if (producerId == null || producerId == 0)
                return BadRequest(new { error = "no actor id" });
            return Json(await service.Get(producerId));
        }
        [HttpGet]
        public async Task<IActionResult> All()
        {
            var all = service.GetAll();
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> Films(int producerId)
        {
            if (producerId == null || producerId == 0)
                return BadRequest(new { error = "no actor id" });
            var all = service.GetFilms(producerId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
    }
}
