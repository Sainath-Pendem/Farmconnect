package com.example.backend;

import com.example.backend.Repository.BuyerRepo;
import com.example.backend.Repository.FarmerRepo;
import com.example.backend.Model.Farmer;
import com.example.backend.Model.Buyer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private FarmerRepo farmerRepo;

    @Autowired
    private BuyerRepo buyerRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Farmer> farmer = farmerRepo.findByEmail(email);
        if (farmer.isPresent()) {
            Farmer f=farmer.get();
            return new User(
                    f.getEmail(), f.getPassword(),
                    List.of(new SimpleGrantedAuthority("Farmer"))
            );
        }

        Optional<Buyer> buyer = buyerRepo.findByEmail(email);
        if (buyer.isPresent()) {
            Buyer b=buyer.get();
            return new User(
                    b.getEmail(), b.getPassword(),
                    List.of(new SimpleGrantedAuthority("Buyer"))
            );
        }

        throw new UsernameNotFoundException("User not found");
    }
}
