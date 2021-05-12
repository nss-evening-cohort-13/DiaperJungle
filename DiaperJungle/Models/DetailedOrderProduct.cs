using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiaperJungle.Models
{
    public class DetailedOrderProduct
    {
        public int id { get; set; }
        public int order_id { get; set; }
        public int product_id { get; set; }
        public double price { get; set; }
        public int quantity { get; set; }

        public string title { get; set; }
        public string description { get; set; }
        public string image_url { get; set; }
    }
}
