package com.example.backend.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer o_id;

    private Integer p_id;
    private String quantity;
    private String p_name;
    private Integer totalcost;
    private Integer b_id;
    private Integer id;
    private String status;
    private String payment;


}
