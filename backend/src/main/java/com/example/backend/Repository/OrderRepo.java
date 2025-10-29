package com.example.backend.Repository;


import com.example.backend.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order,Integer> {


    @Query("SELECT o FROM Order o WHERE o.id= :id")
    List<Order> getallorders(@Param("id") Integer id);



    @Query("SELECT o FROM Order o WHERE o.b_id = :b_id AND o.status = 'accepted'")
    List<Order> getorders(@Param("b_id") Integer b_id);


}
