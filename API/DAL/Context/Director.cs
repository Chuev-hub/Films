﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    [Serializable]
    public class Director
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Film> Films { get; set; } = new List<Film>();
    }
}
