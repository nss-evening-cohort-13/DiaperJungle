using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiaperJungle.Models
{
    public class DetailedOrder
    {
        public int id { get; set; }
        public string pay_type { get; set; }
        public double total_cost { get; set; }
        public int user_id { get; set; }
        public bool is_complete { get; set; }
        public string fb_uid { get; set; }
        public int pay_type_id { get; set; }
        public int account_number { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }

        //One to many
        public List<Product> Product { get; set; } = new List<Product>();

        //One to many
        public List<User> User { get; set; } = new List<User>();
    }
}
