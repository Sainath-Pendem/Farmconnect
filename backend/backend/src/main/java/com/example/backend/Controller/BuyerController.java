package com.example.backend.Controller;

import com.example.backend.Model.Buyer;
import com.example.backend.Model.Farmer;
import com.example.backend.Model.Login;
import com.example.backend.Services.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buyer")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BuyerController {

    @Autowired
    BuyerService buyerService;

    @GetMapping("/{email}")
    public ResponseEntity<Buyer> getbuyer(@PathVariable String email){
        Buyer b=buyerService.getbuyer(email);
        if(b!=null){
            return new ResponseEntity<>(b,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/id/{b_id}")
    public Buyer getbuyerbyId(@PathVariable Integer b_id){

        return buyerService.getbuyerbyId(b_id);
    }

    @PostMapping("/add")
    public void addbuyer(@RequestBody Buyer buyer){
        buyerService.addbuyer(buyer);
    }

    @PostMapping("/signup")
    public void register(@RequestBody Buyer buyer){
        buyerService.register(buyer);
    }

    @GetMapping("/verify/{email}")
    public ResponseEntity<Boolean> verify(@PathVariable  String email){
        return new ResponseEntity<>(buyerService.verify(email), HttpStatus.OK);
    }

    @PostMapping("/login")
    public String log(@RequestBody Login login){
        return buyerService.log(login.getEmail(),login.getPassword());
    }

}
