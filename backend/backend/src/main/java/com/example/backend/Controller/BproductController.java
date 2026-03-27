package com.example.backend.Controller;


import com.example.backend.Model.Product;
import com.example.backend.Services.BproductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/buyer")
public class BproductController {

    @Autowired
    BproductService bproductService;

    @GetMapping("/products")
    public List<Product> getproducts(){
        return bproductService.getproducts();
    }
}
