using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DiaperJungle.DataAccess
{
    public class UserPaymentTypeRepository
    {
        const string ConnectionString = "Server=localhost;Database=DiaperJungle;Trusted_Connection=True;";

        //Get all userspaymenttypes
        public List<UserPaymentType> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From user_payment_type";

            return db.Query<UserPaymentType>(sql).ToList();
        }

        //Get single userspaymenttypes
        public UserPaymentType Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From user_payment_type
                        where Id = @id";

            var prodType = db.QueryFirstOrDefault<UserPaymentType>(sql, new { id = id });

            return prodType;
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from user_payment_type 
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
