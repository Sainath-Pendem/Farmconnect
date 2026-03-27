package com.example.backend.Services;


import com.example.backend.Model.Product;
import com.example.backend.Repository.BproductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BproductService {

    @Autowired
    BproductRepo bproductRepo;

    public List<Product> getproducts() {
        return bproductRepo.getallproducts();
    }
}
