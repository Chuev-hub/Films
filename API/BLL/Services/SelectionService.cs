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
    public class SelectionService : GenericService<SelectionDTO, Selection>
    {
        public SelectionService(FilmContext context)
        {
            Repository = new SelectionRepository(context);
        }
        public List<Film> GetFilms(int id) => ((SelectionRepository)Repository).GetFilms(id);
        public void AddFilm(int selId, int filmId) => ((SelectionRepository)Repository).AddFilm(selId, filmId);
        public void RemoveFilm(int selId, int filmId) => ((SelectionRepository)Repository).RemoveFilm(selId, filmId);
    }
}
