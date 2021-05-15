using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiaperJungle.Models
{
    public class Order_Product
    {
        public int id { get; set; }
        public int order_id { get; set; }
        public int product_id { get; set; }
        public double price { get; set; }
        public int units { get; set; }
        public string product_desc { get; set; }
    }
}
