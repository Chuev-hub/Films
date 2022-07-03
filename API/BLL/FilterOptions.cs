using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsSpeedRunAPI
{
    public class FilterOptions
    {
        public int Page { get; set; }
        public string Prop { get; set; } = "base";
        public double RatingTop { get; set; } = 0;
        public double RatingLast { get; set; } = 10;
        public DateTime DateTop { get; set; } = new DateTime(1800, 1, 1);
        public DateTime DateLast { get; set; } = DateTime.Now;
        public string Genre { get; set; } = "all";

    }
}

