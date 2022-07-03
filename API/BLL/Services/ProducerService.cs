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
    public class ProducerService : GenericService<ProducerDTO, Producer>
    {
        public ProducerService(FilmContext context)
        {
            Repository = new ProducerRepository(context);
        }
        public List<Film> GetFilms(int id) => ((ProducerRepository)Repository).GetFilms(id);
    }
}
