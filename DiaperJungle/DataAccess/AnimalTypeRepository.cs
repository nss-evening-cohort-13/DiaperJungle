using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaperJungle.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DiaperJungle.DataAccess
{
    public class AnimalTypeRepository
    {
        const string ConnectionString = "Server=localhost;Database=DiaperJungle;Trusted_Connection=True;";

        //Get all animal types
        public List<AnimalsType> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Animal_Type";

            return db.Query<AnimalsType>(sql).ToList();
        }

        //Get single animal type
        public AnimalsType Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Animal_Type
                        where Id = @id";

            var prodType = db.QueryFirstOrDefault<AnimalsType>(sql, new { id = id });

            return prodType;
        }

        //Add animal type
        public void Add(AnimalsType animalType)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Insert into [Animal_Type]([animal_category])
			            Output inserted.id
			            Values(@animal_category)";

            var id = db.ExecuteScalar<int>(sql, animalType);

            animalType.id = id;
        }

        //Delete animal_type
        public void Remove(int id)
        {
            var sql = @"Delete 
                        from Animal_Type 
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

        //Update animal_type
        public void Update(AnimalsType animalType)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Update Animal_Type
                        Set animal_category = @animal_category
                        where id = @id";

            db.Execute(sql, animalType);
        }
    }
}
