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
            var sql = @"INSERT INTO [Orders] ([pay_type], [total_cost], [user_id], [is_complete])
                        OUTPUT INSERTED.id 
                        VALUES(@pay_type, @total_cost, @user_id, @is_complete)";

            using var db = new SqlConnection(ConnectionString);
            var orderId = db.ExecuteScalar<int>(sql, order);

            order.id = orderId;

            //foreach (var item in order.Product)
            //{
            //    var productInsert = @"INSERT INTO [dbo].[Order_Product] ([order_id], [product_id], [price], [quantity])
            //                          VALUES (@orderId, @product_id, @price, @quantity)";

            //    db.Execute(productInsert, new { orderId, item });
            //}
            
        }

        //Get orders by user id

        public List<Order> GetOrdersByUserId(string fb_uid)
        {
            var sql = @"Select *
                        From [User] u
	                        Join Orders o
	                        ON o.user_id = u.id
	                        Where u.fb_uid = @fb_uid ";

            //create a connection
            using var db = new SqlConnection(ConnectionString);

            var order = db.Query<Order>(sql, new { fb_uid = fb_uid }).ToList();

            return order;
        }

        public List<DetailedOrder> GetDetailedOrderHistory(string fb_uid)
        {
            var sql = @"Select o.id, o.total_cost, o.user_id, o.is_complete, u.fb_uid, pt.account_number, u.first_name, u.last_name, pt.pay_type, pt.id as pay_type_id
                        From [User] u
                        Join Orders o
                        On o.user_id = u.id
                        join Payment_Type pt
                        on o.pay_type = pt.id
                        Where u.fb_uid = @fb_uid
                        And o.is_complete = 1";

            //create a connection
            using var db = new SqlConnection(ConnectionString);

            var order = db.Query<DetailedOrder>(sql, new { fb_uid = fb_uid }).ToList();

            return order;
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

        //Returns ALL completed orders
        public List<DetailedOrder> GetAllCompleted()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select o.id, o.total_cost, o.user_id, o.is_complete, u.fb_uid, pt.account_number, u.first_name, u.last_name, pt.pay_type, pt.id as pay_type_id
                        From [User] u
                        Join Orders o
                        On o.user_id = u.id
                        join Payment_Type pt
                        on o.pay_type = pt.id
                        Where o.is_complete = 1";

            return db.Query<DetailedOrder>(sql).ToList();
        }
    }
}
