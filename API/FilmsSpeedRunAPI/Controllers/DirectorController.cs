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
    public class DirectorController : Controller
    {
        DirectorService service;
        public DirectorController(FilmContext context)
        {
            service = new DirectorService(context);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] DirectorDTO director)
        {
            if (director == null)
                return BadRequest(new { error = "no actor" });
            await service.AddAsync(director);
            return Ok();
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete([FromBody] int directorId)
        {
            if (directorId == null || directorId == 0)
                return BadRequest(new { error = "no actor id" });
            await service.RemoveAsync(directorId);
            return Ok();
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] DirectorDTO director)
        {
            if (director == null)
                return BadRequest(new { error = "no actor" });
            await service.UpdateAsync(director);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int directorId)
        {
            if (directorId == null || directorId == 0)
                return BadRequest(new { error = "no actor id" });
            return Json(await service.Get(directorId));
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
        public async Task<IActionResult> Films(int directorId)
        {
            if (directorId == null || directorId == 0)
                return BadRequest(new { error = "no actor id" });
            var all = service.GetFilms(directorId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
    }
}
