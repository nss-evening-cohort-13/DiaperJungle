using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.Models;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.EntityFrameworkCore;

namespace DiaperJungle.DataAccess
{
    public class OrderRepository
    {
        const string ConnectionString = "Server=localhost;Database=DiaperJungle;Trusted_Connection=True;";

        //Returns ALL orders
        public List<Order> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Orders";

            return db.Query<Order>(sql).ToList();
        }

        //Adds an order
        public void Add(Order order)
        {
            var sql = @"INSERT INTO [Orders] ([pay_type], [total_cost], [user_id])
                        OUTPUT INSERTED.id 
                        VALUES(@pay_type, @total_cost, @user_id)";

            using var db = new SqlConnection(ConnectionString);
            var orderId = db.ExecuteScalar<int>(sql, order);

            foreach (var item in order.Product)
            {
                var productInsert = @"INSERT INTO [dbo].[Order_Product] ([order_id], [product_id])
                                      VALUES (@orderId, @id)";

                db.Execute(productInsert, new { orderId, item.id });
            }
            order.id = orderId;
        }

        //Get a single order
        public Order Get(int id)
        {
            var sql = @"Select *
                        From Orders
                        where Id = @id";

            //create a connection
            using var db = new SqlConnection(ConnectionString);

            var order = db.QueryFirstOrDefault<Order>(sql, new { id = id });

            return order;
        }

        //Delete a single order
        public void Remove(int id)
        {
            var sql = @"Delete 
                        from Orders 
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

    }
}
