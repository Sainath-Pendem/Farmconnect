package com.example.backend.Repository;

import com.example.backend.Model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FarmerRepo extends JpaRepository<Farmer,Integer> {
    Optional<Farmer> findByEmail(String email);


}
