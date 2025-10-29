package com.example.backend.Repository;

import com.example.backend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {

    @Query("SELECT p FROM Product p WHERE p.farmer.id = :id and  p.quantity>0")
    List<Product> getallproducts(@Param("id") Integer id);

}
