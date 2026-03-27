package com.example.backend.Services;


import com.example.backend.JWTService;
import com.example.backend.Repository.FarmerRepo;
import com.example.backend.Model.Farmer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class FarmerService {

    @Autowired
    FarmerRepo farmerRepo;

    @Autowired
    JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;



    public void addfarmer(Farmer farmer) {
        farmerRepo.save(farmer);
    }

    public void deletefarmer(Integer id) {
        farmerRepo.deleteById(id);
    }




    BCryptPasswordEncoder b=new BCryptPasswordEncoder(12);


    public Farmer register(Farmer farmer) {
            farmer.setPassword(b.encode(farmer.getPassword()));
            return farmerRepo.save(farmer);

    }

    public Farmer getfarmer(String email) throws NoSuchElementException {
        Optional<Farmer> farmer = farmerRepo.findByEmail(email);
        return farmer.orElse(null);
    }


    public String log(String email, String password) {
        Optional<Farmer> farmer = farmerRepo.findByEmail(email);

        if (farmer.isPresent()) {
            Farmer f = farmer.get();
            if (b.matches(password, f.getPassword())) {
                return jwtService.generateKey(email);
            }
        }
        return "User Not Exist";
    }

    public boolean verify(String email) {
        Optional<Farmer> f=farmerRepo.findByEmail(email);
        return f.isPresent();
    }

    public static class CustomUserDetailsService {
    }
}
