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

        // get user by fb_uid
        public List<Order_Product> GetCartByFBUid(string fb_uid)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select op.*
                        from Order_Product op
	                        join Orders o
	                        ON op.order_id = o.id
	                            join Product p
	                            ON op.product_id = p.id
		                            join [User] u
		                            ON o.user_id = u.id
		                                Where u.fb_uid = @fb_uid
		                                AND o.is_complete = 0";

            return db.Query<Order_Product>(sql, new { fb_uid = fb_uid }).ToList();
        }
        
        //Get products from an order
        public List<DetailedOrderProduct> GetAllProductsOfAnOrder(int orderId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select op.*, p.title, p.description, p.image_url
                        From Order_Product op
                        join Product p
                        on op.product_id = p.id
                        Where op.order_id = @orderId";

            return db.Query<DetailedOrderProduct>(sql, new { orderId = orderId }).ToList();
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

        //Add Product to Order_Product
        public void Add(Order_Product order_product)
        {
            var sql = @"INSERT INTO [Order_Product] ([order_id], [product_id], [price], [units], [product_desc])
                                                OUTPUT inserted.id
                                                VALUES(@order_id, @product_id, @price, @units, @product_desc)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, order_product);


            order_product.id = id;
        }
    }
}
