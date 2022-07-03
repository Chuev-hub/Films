using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class GenreRepository : GenericRepository<Genre>
    {
        public GenreRepository(FilmContext context) : base(context)
        {

        }
        public List<Film> GetFilms(int id)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Genres.Include(x => x.Films)
                                .ToList()
                                .Where(x => x.Id == id)
                                .Select(x => x.Films)
                                .ToList()[0]
                                .ToList();
            foreach (Film film in list)
                film.Genres = null;
            return list;
        }
    }
}
