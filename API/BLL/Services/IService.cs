using AutoMapper;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public interface IService<T, T1> where T : class where T1 : class
    {
        public Task<T> Get(int id);
        public IEnumerable<T> GetAll();
        public Task AddAsync(T entity);
        public Task RemoveAsync(int id);
        public Task UpdateAsync(T entity);
    }
}
