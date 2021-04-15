using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DiaperJungle.DataAccess
{
    public class ProductTypeRepository
    {
        const string ConnectionString = "Server=localhost;Database=DiaperJungle;Trusted_Connection=True;";

        //Get all product_types
        public List<ProductType> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Product_Type";

            return db.Query<ProductType>(sql).ToList();
        }

        //Get single product_type
        public ProductType Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Product_Type
                        where Id = @id";

            var prodType = db.QueryFirstOrDefault<ProductType>(sql, new { id = id });

            return prodType;
        }

        //Add product_type
        public void Add(ProductType productType)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Insert into [Product_Type]([category])
			            Output inserted.id
			            Values(@category)";

            var id = db.ExecuteScalar<int>(sql, productType);

            productType.id = id;
        }

        //Delete product_type
        public void Remove(int id)
        {
            var sql = @"Delete 
                        from Product_Type 
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

        //Update product_type
        public void Update(ProductType productType)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Update Product_Type
                        Set category = @category
                        where id = @id";

            db.Execute(sql, productType);
        }
    }
}
