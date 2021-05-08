using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DiaperJungle.DataAccess
{
    public class Order_ProductRepository
    {
        const string ConnectionString = "Server=localhost;Database=DiaperJungle;Trusted_Connection=True;";

        //Get all product_types
        public List<Order_Product> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Order_Product";

            return db.Query<Order_Product>(sql).ToList();
        }

        //Get single Order_Product
        public Order_Product Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Order_Product
                        where Id = @id";

            var prodType = db.QueryFirstOrDefault<Order_Product>(sql, new { id = id });

            return prodType;
        }

        //Get products from an order
        public List<Order_Product> GetAllProductsOfAnOrder(int orderId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Order_Product op
                        Where op.order_id = @orderId";

            return db.Query<Order_Product>(sql, new { orderId = orderId }).ToList();
        }

        //Delete Order_Product
        public void Remove(int id)
        {
            var sql = @"Delete 
                        from Order_Product 
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

    }
}
