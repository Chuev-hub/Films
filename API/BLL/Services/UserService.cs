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
    public class UserService : GenericService<UserDTO, User>
    {
        public UserService(FilmContext context)
        {
            Repository = new UserRepository(context);
        }
        public List<Selection> GetSelections(int id) => ((UserRepository)Repository).GetSelections(id);

        public bool Login(string login, string passwordHash)
        {
            if (GetAll().Where(user => user.Login == login && user.PasswordHash == passwordHash).Count() > 0)
                return true;
            return false;
        }
        public int GetId(string login, string passwordHash)
        {
            return GetAll().Where(user => user.Login == login && user.PasswordHash == passwordHash).FirstOrDefault().Id;
        }

        public bool ValidateUserName(string login)
        {
            if (GetAll().Where(user => user.Login == login).Count() != 0)
                return false;
            return true;
        }
    }
}
