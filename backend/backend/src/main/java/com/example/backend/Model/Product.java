package com.example.backend.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer p_id;

    private String name;
    private String category;
    private int price;

    private Date date;
    private int quantity;
    private String pincode;

    @ManyToOne
    @JoinColumn(name = "id")  // this is the foreign key column in product table
    private Farmer farmer;

    private String imagetype;
    private String imagename;
    @Lob
    private byte[] url;


}
