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

        public User Get(int id)
        {
            var sql = @"SELECT *
                        FROM [User]
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singleUser = db.QueryFirstOrDefault<User>(sql, new { id = id });

            return singleUser;
        }

        public void Add(User user)
        {
            var sql = @"INSERT INTO [dbo].[User] ([first_name], [last_name], [date_created], [username], [password], [is_admin])
                        OUTPUT inserted.id
                        VALUES(@first_name, @last_name, CURRENT_TIMESTAMP, @username, @password, @is_admin)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, user);

            user.id = id;
        }

        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM [User]
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }
    }
}
