using AutoMapper;
using BLL.DTO;
using DAL.Context;
using DAL.Repositories;
using FilmsSpeedRunAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class FilmService : GenericService<FilmDTO, Film>
    {
        List<FilmDTO> films { get; set; }
        string Mode { get; set; } = "base";
        FilmContext context;
        public FilmService(FilmContext context)
        {
            this.context = context;
            Repository = new FilmRepository(context);
            films = GetAll().ToList();
            MapperConfiguration config = new MapperConfiguration(con =>
            {
                con.CreateMap<Film, FilmDTO>().ReverseMap();
                con.CreateMap<Actor, ActorDTO>().ReverseMap();
                con.CreateMap<Producer, ProducerDTO>().ReverseMap();
                con.CreateMap<Director, DirectorDTO>().ReverseMap();
                con.CreateMap<Genre, GenreDTO>().ReverseMap();
            });
            Mapper = new Mapper(config);
        }
        public override async Task AddAsync(FilmDTO filmdto)
        {
            Film film = Mapper.Map<FilmDTO, Film>(filmdto);
            film.Actors.Clear();
            film.Producers.Clear();
            film.Directors.Clear();
            film.Genres.Clear();
            await Repository.AddAsync(film);
            await Repository.SaveChanges();
            film = ((FilmRepository)Repository).GetFull(film);
            film.Actors = new List<Actor>();
            film.Producers = new List<Producer>();
            film.Directors = new List<Director>();
            film.Genres = new List<Genre>();
            foreach (ActorDTO actor in filmdto.Actors)
                film.Actors.Add(context.Actors.FirstOrDefault(x => x.Id == actor.Id));
            foreach (ProducerDTO produce in filmdto.Producers)
                film.Producers.Add(context.Producers.FirstOrDefault(x => x.Id == produce.Id));
            foreach (DirectorDTO director in filmdto.Directors)
                film.Directors.Add(context.Directors.FirstOrDefault(x => x.Id == director.Id));
            foreach (GenreDTO genre in filmdto.Genres)
                film.Genres.Add(context.Genres.FirstOrDefault(x => x.Id == genre.Id));
            await Repository.UpdateAsync(film);
            await Repository.SaveChanges();
        }
        public List<Actor> GetActors(int filmId) => ((FilmRepository)Repository).GetActors(filmId);
        public List<Producer> GetProducers(int filmId) => ((FilmRepository)Repository).GetProducers(filmId);
        public List<Genre> GetGenres(int filmId) => ((FilmRepository)Repository).GetGenres(filmId);
        public List<Director> GetDirectors(int filmId) => ((FilmRepository)Repository).GetDirectors(filmId);
        public List<Selection> GetSelections(int filmId) => ((FilmRepository)Repository).GetSelections(filmId);
        public Company GetCompany(int filmId) => ((FilmRepository)Repository).GetCompany(filmId);
        public int GetCount()
        {
            return context.Films.Count();
        }
        public List<FilmDTO> GetSortedPage(string property, int page, List<FilmDTO> fs)
        {
            
            if(property == "dateofpublishing" && Mode == property)
                fs.OrderByDescending(x => x.DateOfPublishing).ToList();
            if(property == "rating" && Mode == property)
                fs.OrderByDescending(x => x.Rating).ToList();
            if (property == "title" && Mode == property)
                fs.OrderByDescending(x => x.Title).ToList();
            if (property == "base" && Mode == property)
                fs = GetAll().ToList();
            Mode = property;
            int start = page * 10;
            if (start >= films.Count())
                start = films.Count() - 11;
            if (start < 0)
                start = 0;
            int end = start + 10;
            if (end >= films.Count())
                end = films.Count() - 1;
            if (end < 0)
                end = 0;
            return fs.GetRange(start, end);
        }
        public List<FilmDTO> SortedFilter(FilterOptions options)
        {            
            List<FilmDTO> fs = new List<FilmDTO>();
            foreach(var film in films)
            {
                List<string> genres = GetGenres(film.Id).Select(x => x.Name).ToList();
                if (options.Genre == "all")
                {
                    if (film.DateOfPublishing >= options.DateTop
                    && film.DateOfPublishing <= options.DateLast
                    && film.Rating >= options.RatingTop
                    && film.Rating <= options.RatingLast)
                        fs.Add(film);
                }
                else
                {
                    if (film.DateOfPublishing >= options.DateTop
                    && film.DateOfPublishing <= options.DateLast
                    && film.Rating >= options.RatingTop
                    && film.Rating <= options.RatingLast
                    && genres.Contains(options.Genre))
                        fs.Add(film);
                }
            }
            return fs;
        }
    }
}
