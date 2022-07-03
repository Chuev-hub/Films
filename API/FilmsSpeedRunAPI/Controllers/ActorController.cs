using BLL.DTO;
using BLL.Services;
using DAL.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
    public class ActorController : Controller
    {
        ActorService service;
        public ActorController(FilmContext context)
        {
            service = new ActorService(context);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ActorDTO actor)
        {
            if (actor == null)
                return BadRequest(new { error = "no actor" });
            await service.AddAsync(actor);
            return Ok();
        }
        [Authorize(AuthenticationSchemes =
    JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete]
        public async Task<IActionResult> Delete(int actorId)
        {
            if (actorId == null || actorId == 0)
                return BadRequest(new { error = "no actor id" });
            await service.RemoveAsync(actorId);
            return Ok();
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] ActorDTO actor)
        {
            if (actor == null)
                return BadRequest(new { error = "no actor" });
            await service.UpdateAsync(actor);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int actorId)
        {
            if (actorId == null || actorId == 0)
                return BadRequest(new { error = "no actor id" });
            return Json(await service.Get(actorId));
        }
        [HttpGet]
        public async Task<IActionResult> All()
        {
            var all = service.GetAll();
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json (all);
        }
        [HttpGet]
        public async Task<IActionResult> Films(int actorId)
        {
            if (actorId == null || actorId == 0)
                return BadRequest(new { error = "no actor id" });
            var all = service.GetFilms(actorId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
    }
}
