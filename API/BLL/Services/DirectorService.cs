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
    public class DirectorService : GenericService<DirectorDTO, Director>
    {
        public DirectorService(FilmContext context)
        {
            Repository = new DirectorRepository(context);
        }
        public List<Film> GetFilms(int id) => ((DirectorRepository)Repository).GetFilms(id);
    }
}
