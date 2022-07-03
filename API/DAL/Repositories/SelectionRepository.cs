using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DAL.Repositories
{
    public class SelectionRepository : GenericRepository<Selection>
    {
        public SelectionRepository(FilmContext context) : base(context) 
        { 
        }
        public void AddFilm(int selectionId, int filmId)
        {
            FilmContext contx = (FilmContext)context;
            Selection select = contx.Selections.Include(x => x.Films).FirstOrDefault(s => s.Id == selectionId);
            select.Films.Add(contx.Films.Find(filmId));
            contx.SaveChanges();
        }
        public void RemoveFilm(int selectionId, int filmId)
        {
            FilmContext contx = (FilmContext)context;
            Selection select = contx.Selections.Include(x => x.Films).FirstOrDefault(s => s.Id == selectionId);
            select.Films.Remove(contx.Films.Find(filmId));
            contx.SaveChanges();
        }
        public List<Film> GetFilms(int id)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Selections.Include(x => x.Films)
                                .ToList()
                                .Where(x => x.Id == id)
                                .Select(x => x.Films)
                                .ToList()[0]
                                .ToList();
            foreach (Film film in list)
                film.Selections = null;
            return list;
        }
    }
}
