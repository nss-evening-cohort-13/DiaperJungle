using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace DiaperJungle.DataAccess
{
    public class UserRepository
    {
        const string ConnectionString = "Server=localhost;Database=DiaperJungle;Trusted_Connection=True;";

        public List<User> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [User]";

            var results = db.Query<User>(sql).ToList();
            return results;
        }
    }
}
