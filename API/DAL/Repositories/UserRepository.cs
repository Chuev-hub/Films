using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DAL.Repositories
{
    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(FilmContext context) : base(context) { }
        public List<Selection> GetSelections(int id)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Users.Include(x => x.Selections)
                              .ToList()
                              .Where(x => x.Id == id)
                              .Select(x => x.Selections)
                              .ToList()[0]
                              .ToList();
            foreach (Selection selection in list)
                selection.Films = null;
            return list;
        }
    }
}
