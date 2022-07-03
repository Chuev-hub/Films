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
    public class RoleController : Controller
    {
        RoleService service;
        public RoleController(FilmContext context)
        {
            service = new RoleService(context);
        }
        [HttpGet]
        public async Task<IActionResult> Get(int roleId)
        {
            if (roleId == null || roleId == 0)
                return BadRequest(new { error = "no role id" });
            var role = await service.Get(roleId);
            return Json(role);
        }
    }
}
