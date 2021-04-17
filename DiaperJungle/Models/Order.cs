using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiaperJungle.Models
{
    public class Order
    {
        public int id { get; set; }
        public int prod_id { get; set; }
        public int product_quantity { get; set; }
        public string pay_type { get; set; }
        public double total_cost { get; set; }
        public int user_id { get; set; }
        
        //One to many
        public List<Product> Product { get; set; }

        //One to many
        public List<User> User { get; set; }
    }
}
