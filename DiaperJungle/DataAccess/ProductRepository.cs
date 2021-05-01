using System;
using System.Collections.Generic;
using System.Linq;
using DiaperJungle.Models;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;

namespace DiaperJungle.DataAccess
{
    public class ProductRepository
    {
        const string connectionString = "Server=localhost;Database=DiaperJungle;Trusted_Connection=True;";

        //Get all products
        public List<Product> GetAll()
        {
            //create connection
            using var db = new SqlConnection(connectionString);

            //sql select all from products
            var sql = @"Select *
                        From Product";

            //grab sql data and turn it into list
            var results = db.Query<Product>(sql).ToList();

            //return list
            return results;
        }

        //Get a single product
        public Product Get(int id)
        {
            //sql select product with specific id
            var sql = @"Select *
                        From Product
                        where Id = @id";

            //create connection
            using var db = new SqlConnection(connectionString);
                                                                   //name = value             
            var product = db.QueryFirstOrDefault<Product>(sql, new { id = id});

            return product;
        }

        //Add a product into the database
        public void Add(Product product)
        {
            var sql = @"INSERT INTO [Product] ([type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id])
                                                OUTPUT inserted.id
                                                VALUES(@type_id, @price, @title, @description, @quantity, @image_url, @animal_type_id)";

            using var db = new SqlConnection(connectionString);

            var id = db.ExecuteScalar<int>(sql, product);
         

            product.id = id;
            
        }
        
        //Remove a product form database
        public void Remove(int id)
        {
            var sql = @"Delete 
                        From Product
                        where id = @id";

            using var db = new SqlConnection(connectionString);

            db.Execute(sql, new { id = id });
        }

        //Update a product
        public void Update(Product product)
        {
            using var db = new SqlConnection(connectionString);

            var sql = @"UPDATE [Product]
                        SET type_id = @type_id,
                            price = @price,
	                        title = @title,
	                        description = @description,
	                        quantity = @quantity,
                            image_url = @image_url,
                            animal_type_id = @animal_type_id
                        WHERE id = @id";

            db.Execute(sql, product);
        }
    }
}
