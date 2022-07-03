using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public interface IRepository<T> where T : class
    {
        public Task<T> GetAsync(int id);
        public IEnumerable<T> GetAll();
        public Task UpdateAsync(T entity);
        public Task AddAsync(T entity);
        public Task RemoveAsync(T entity);
        public Task SaveChanges();
    }
}
