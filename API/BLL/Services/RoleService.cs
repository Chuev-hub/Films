using BLL.DTO;
using DAL.Context;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class RoleService : GenericService<RoleDTO, Role>
    {
        public RoleService(FilmContext context)
        {
            Repository = new RoleRepository(context);
        }
    }
}
