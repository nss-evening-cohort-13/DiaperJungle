using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiaperJungle.Models
{
    public class UserPaymentType
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public int payment_type_id { get; set; }

        //one to one
        public User user { get; set; }

        //one to many
        public List<PaymentType> payment_type { get; set; }
    }
}
