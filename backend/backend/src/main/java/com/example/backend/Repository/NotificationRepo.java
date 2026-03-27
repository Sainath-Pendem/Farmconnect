package com.example.backend.Repository;


import com.example.backend.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification,Integer> {


    @Query("SELECT n FROM Notification n WHERE n.id=:id")
    List<Notification> findnotificationbyId(@Param("id") Integer id);
}
