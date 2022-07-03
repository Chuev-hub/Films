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
    public class ActorService : GenericService<ActorDTO, Actor>
    {
        public ActorService(FilmContext context)
        {
            Repository = new ActorRepository(context);
        }
        public List<Film> GetFilms(int id) => ((ActorRepository)Repository).GetFilms(id);
    }
}
