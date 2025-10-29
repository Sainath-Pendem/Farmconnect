package com.example.backend.Services;

import com.example.backend.Model.Product;
import com.example.backend.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {


    @Autowired
    ProductRepo productRepo;


    public Product addproduct(Product product, MultipartFile Image) throws IOException {
        product.setImagename(Image.getOriginalFilename());
        product.setImagetype(Image.getContentType());
        product.setUrl(Image.getBytes());
        return productRepo.save(product);
    }

    public Product getproduct(Integer p_id) {
        return productRepo.findById(p_id).orElse(null);
    }

//
//    public void deleteProduct(Integer p_id) {
//        productRepo.deleteById(p_id);
//    }
//
//    public Product updateProduct(Integer p_id, Product product, MultipartFile imageFile) throws IOException {
//        product.setImageName(imageFile.getOriginalFilename());
//        product.setImagetype(imageFile.getContentType());
//        product.setUrl(imageFile.getBytes());
//        return productRepo.save(product);
//    }

    public List<Product> getallproducts(Integer id) {
        return productRepo.getallproducts(id);
    }

    public void deleteproduct(Integer p_id) {
        productRepo.deleteById(p_id);
    }



    public Product updateProduct(Integer productId, Product product, MultipartFile imageFile) throws IOException {
        // Ensure the product being updated has the correct ID
        product.setP_id(productId);

        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImagename(imageFile.getOriginalFilename());
            product.setImagetype(imageFile.getContentType());
            product.setUrl(imageFile.getBytes());
        } else {
            // Load existing product to retain image fields
            Product existing = productRepo.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            product.setImagename(existing.getImagename());
            product.setImagetype(existing.getImagetype());
            product.setUrl(existing.getUrl());
        }

        return productRepo.save(product);
    }


}
