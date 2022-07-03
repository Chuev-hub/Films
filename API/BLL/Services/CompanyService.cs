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
    public class CompanyService : GenericService<CompanyDTO, Company>
    {
        public CompanyService(FilmContext context)
        {
            Repository = new CompanyRepository(context);
        }
        public List<Film> GetFilms(int id) => ((CompanyRepository)Repository).GetFilms(id);
    }
}
