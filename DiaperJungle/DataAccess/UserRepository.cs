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

        //Gets all users
        public List<User> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [User]";

            var results = db.Query<User>(sql).ToList();
            return results;
        }

        //Gets a single user
        public User Get(int id)
        {
            var sql = @"SELECT *
                        FROM [User]
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singleUser = db.QueryFirstOrDefault<User>(sql, new { id = id });

            return singleUser;
        }

        //Adds a user
        public void Add(User user)
        {
            var sql = @"INSERT INTO [dbo].[User] ([first_name], [last_name], [date_created], [username], [password], [is_admin], [fb_uid])
                        OUTPUT inserted.id
                        VALUES(@first_name, @last_name, CURRENT_TIMESTAMP, @username, @password, @is_admin, @fb_uid)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, user);

            user.id = id;
        }

        //Removes a user
        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM [User]
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }

        //updates a user
        public void Update(User user)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [User]
                        SET first_name = @first_name,
                            last_name = @last_name,
	                        username = @username,
	                        password = @password,
	                        is_admin = @is_admin
                        WHERE id = @id";

            db.Execute(sql, user);
        }
    }
}
