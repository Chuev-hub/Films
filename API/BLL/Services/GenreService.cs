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
    public class GenreService : GenericService <GenreDTO, Genre>        
    {
        public GenreService(FilmContext context)
        {
            Repository = new GenreRepository(context);
        }
        public List<Film> GetFilms(int id) => ((GenreRepository)Repository).GetFilms(id);
    }
}
