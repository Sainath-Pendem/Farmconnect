package com.example.backend.Controller;


import com.example.backend.Model.Farmer;
import com.example.backend.Model.Login;
import com.example.backend.Services.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/farmer")
@RestController
public class FarmerController {

    @Autowired
    FarmerService farmerService;

    @GetMapping("/{email}")
    public ResponseEntity<Farmer> getfarmer(@PathVariable String email){
        Farmer f=farmerService.getfarmer(email);
        if(f!=null){
            return new ResponseEntity<>(f,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public void addfarmer(@RequestBody  Farmer farmer){
        farmerService.addfarmer(farmer);
    }

    @DeleteMapping("/delete/{Id}")
    public void deletefarmer(@PathVariable Integer Id){
        farmerService.deletefarmer(Id);
    }

    @PostMapping("/signup")
    public ResponseEntity<Farmer> register(@RequestBody Farmer farmer){
        Farmer f=farmerService.register(farmer);
        if(f!=null){
            return new ResponseEntity<>(f,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/verify/{email}")
    public ResponseEntity<Boolean> verify(@PathVariable  String email){
        return new ResponseEntity<>(farmerService.verify(email),HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> log(@RequestBody Login login){

        if((farmerService.log(login.getEmail(), login.getPassword())).equals("User Not Exist")){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(farmerService.log(login.getEmail(), login.getPassword()),HttpStatus.OK);
        }
    }



}
