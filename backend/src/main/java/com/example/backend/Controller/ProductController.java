package com.example.backend.Controller;


import com.example.backend.Model.Product;
import com.example.backend.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/farmer")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/products/{id}")
    public ResponseEntity<List<Product>> getallproducts(@PathVariable Integer id){
        return new ResponseEntity<>(productService.getallproducts(id),HttpStatus.OK);
    }

    @PostMapping("/product")
    public ResponseEntity<?> addproduct(@RequestPart Product product,
                                        @RequestPart MultipartFile imageFile){
        try{
            Product product1=productService.addproduct(product,imageFile);
            return new ResponseEntity<>(product1,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/product/update/{p_id}")
    public ResponseEntity<String> updateProduct(@PathVariable Integer p_id,@RequestPart Product product,
                                                @RequestPart MultipartFile imageFile){
        try {
            Product product1 = productService.updateProduct(p_id, product, imageFile);
            return new ResponseEntity<>("update success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("update failed",HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/product/{p_id}")
    public ResponseEntity<Product> getproduct(@PathVariable Integer p_id){
        Product product=productService.getproduct(p_id);
        if(product != null)
            return new ResponseEntity<>(product,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }



    @GetMapping("/product/{p_id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Integer p_id){
        Product product=productService.getproduct(p_id);
        byte[] imageFile=product.getUrl();
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(product.getImagetype()))
                .body(imageFile);
    }

    @DeleteMapping("/product/delete/{p_id}")
    public void deleteproduct(@PathVariable Integer p_id){
        productService.deleteproduct(p_id);
    }


}
