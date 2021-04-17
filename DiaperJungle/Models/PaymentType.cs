using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiaperJungle.Models
{
    public class PaymentType
    {
        public int id { get; set; }
        public string pay_type { get; set; }
        public int account_number { get; set; }
    }
}
