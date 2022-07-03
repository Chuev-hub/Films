using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    [Serializable]
    public class SelectionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        //public virtual IEnumerable<Film> Films { get; set; }
    }
}
