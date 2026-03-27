package com.example.backend.Repository;


import com.example.backend.Model.Notif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotifRepo extends JpaRepository<Notif,Integer> {


    @Query("SELECT n FROM Notif n WHERE n.b_id = :bId")
    List<Notif> getnotif(@Param("bId") Integer bId);

}
