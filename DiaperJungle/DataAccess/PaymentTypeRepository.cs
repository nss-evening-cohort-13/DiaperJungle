using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace DiaperJungle.DataAccess
{
    public class PaymentTypeRepository
    {
        const string ConnectionString = "Server=localhost;Database=DiaperJungle;Trusted_Connection=True;";

        public List<PaymentType> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM Payment_Type";

            var results = db.Query<PaymentType>(sql).ToList();
            return results;
        }

        public PaymentType Get(int id)
        {
            var sql = @"SELECT *
                        FROM Payment_Type
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singlePayType = db.QueryFirstOrDefault<PaymentType>(sql, new { id = id });

            return singlePayType;
        }
    }
}
