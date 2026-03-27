package com.example.backend.Services;

import com.example.backend.JWTService;
import com.example.backend.Model.Buyer;
import com.example.backend.Model.Farmer;
import com.example.backend.Repository.BuyerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BuyerService {

    @Autowired
    BuyerRepo buyerRepo;

    @Autowired
    JWTService jwtService;

    public void addbuyer(Buyer buyer) {
        buyerRepo.save(buyer);
    }

    BCryptPasswordEncoder b=new BCryptPasswordEncoder(12);

    public void register(Buyer buyer) {
        buyer.setPassword(b.encode(buyer.getPassword()));
        buyerRepo.save(buyer);
    }

    public String log(String email, String password) {
        Optional<Buyer> buyer = buyerRepo.findByEmail(email);
        if (buyer.isPresent()) {
            Buyer b1 = buyer.get();
            System.out.println("Buyer found: " + b1.getEmail());
            if (b.matches(password, b1.getPassword())) {
                System.out.println("Password matched");
                return jwtService.generateKey(b1.getEmail());
            } else {
                System.out.println("Password mismatch");
            }
        } else {
            System.out.println("Buyer not found");
        }
        return "User not Exist";
    }


    public Boolean verify(String email) {
        Optional<Buyer> b=buyerRepo.findByEmail(email);
        return b.isPresent();
    }

    public Buyer getbuyer(String email) {
        Optional<Buyer> b1 = buyerRepo.findByEmail(email);
        return b1.orElse(null);

    }

    public Buyer getbuyerbyId(Integer id) {
        return buyerRepo.findById(id).orElse(null);
    }

    public static class CustomUserDetailsService {
    }
}
