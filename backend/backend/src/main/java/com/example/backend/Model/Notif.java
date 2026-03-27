package com.example.backend.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Notif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no_id;

    private Integer id;
    private Integer o_id;
    private Integer b_id;
    private String message;
    private String  status;
}
