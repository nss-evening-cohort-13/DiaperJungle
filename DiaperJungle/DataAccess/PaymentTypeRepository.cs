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

        public List<PaymentType> GetUserPayments(int user_id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM Payment_Type
                        WHERE Payment_Type.user_id = @user_id";

            var payment = db.Query<PaymentType>(sql, new { user_id = user_id }).ToList();

            return payment;
        }

        public void Add(PaymentType paymentType)
        {
            var sql = @"INSERT INTO [dbo].[Payment_Type] ([pay_type], [account_number], [user_id])
                        OUTPUT inserted.id
                        VALUES(@pay_type, @account_number, @user_id)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, paymentType);

            paymentType.id = id;
        }
    }
}
