package com.example.backend.Controller;


import com.example.backend.Model.Notification;
import com.example.backend.Model.Order;
import com.example.backend.Services.NotificationService;
import com.example.backend.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderService orderService;



    @PostMapping("/checkout")
    public void addorder(@RequestBody List<Order> orders){
        for(Order o:orders) {
            Order order = new Order();
            order.setP_id(o.getP_id());
            order.setP_name(o.getP_name());
            order.setPayment(o.getPayment());
            order.setQuantity(o.getQuantity());
            order.setTotalcost(o.getTotalcost());
            order.setB_id(o.getB_id());
            order.setId(o.getId());
            orderService.addorder(order);
        }
    }


    @GetMapping("/farmer/{id}")
    public List<Order> getorders(@PathVariable Integer id){
        return orderService.getorders(id);
    }


    @PutMapping("/status/{o_id}")
    public void putstatus(@PathVariable Integer o_id,@RequestBody String status){
        orderService.putstatus(o_id,status);
    }


    @DeleteMapping("/delete/{o_id}")
    public ResponseEntity<Void> deleteorders(@PathVariable Integer o_id){
        orderService.deleteorders(o_id);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/myorders/{b_id}")
    public List<Order> getallorders(@PathVariable Integer b_id){
        return orderService.getallorders(b_id);
    }
}
