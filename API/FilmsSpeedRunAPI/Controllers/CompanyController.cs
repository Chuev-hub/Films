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
    public class CompanyController : Controller
    {
        CompanyService service;
        public CompanyController(FilmContext context)
        {
            service = new CompanyService(context);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] CompanyDTO company)
        {
            if (company == null)
                return BadRequest(new { error = "no company" });
            await service.AddAsync(company);
            return Ok();
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete([FromBody] int companyId)
        {
            if (companyId == null || companyId == 0)
                return BadRequest(new { error = "no company id" });
            await service.RemoveAsync(companyId);
            return Ok();
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] CompanyDTO company)
        {
            if (company == null)
                return BadRequest(new { error = "no company" });
            await service.UpdateAsync(company);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int companyId)
        {
            if (companyId == null || companyId == 0)
                return BadRequest(new { error = "no company id" });
            return Json(await service.Get(companyId));
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
        public async Task<IActionResult> Films(int companyId)
        {
            if (companyId == null || companyId == 0)
                return BadRequest(new { error = "no company id" });
            var all = service.GetFilms(companyId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
    }
}
