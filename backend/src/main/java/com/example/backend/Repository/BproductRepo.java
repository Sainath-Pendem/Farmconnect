package com.example.backend.Repository;


import com.example.backend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BproductRepo extends JpaRepository<Product,Integer> {

    @Query("SELECT p FROM Product p JOIN Buyer b ON p.pincode = b.pincode where p.quantity>0")
    List<Product> getallproducts();
}
