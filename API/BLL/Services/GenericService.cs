using AutoMapper;
using DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class GenericService<T, T1> : IService<T, T1> where T : class where T1 : class
    {
        protected IRepository<T1> Repository { get; set; }
        protected IMapper Mapper { get; set; }
        public GenericService()
        {
            MapperConfiguration config = new MapperConfiguration(con => con.CreateMap<T, T1>().ReverseMap());
            Mapper = new Mapper(config);
        }

        public virtual async Task AddAsync(T entity)
        {
            await Repository.AddAsync(Mapper.Map<T, T1>(entity));
            await Repository.SaveChanges();
        }

        public async Task<T> Get(int id) => Mapper.Map<T1, T>(await Repository.GetAsync(id));

        public IEnumerable<T> GetAll() => Mapper.Map<IEnumerable<T1>, IEnumerable<T>>(Repository.GetAll());

        public async Task RemoveAsync(int id)
        {
            await Repository.RemoveAsync(await Repository.GetAsync(id));
            await Repository.SaveChanges();
        }

        public async Task UpdateAsync(T entity)
        {
            await Repository.UpdateAsync(Mapper.Map<T, T1>(entity));
            await Repository.SaveChanges();
        }
    }
}
