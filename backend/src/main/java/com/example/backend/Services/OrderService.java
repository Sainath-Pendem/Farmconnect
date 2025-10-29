package com.example.backend.Services;


import com.example.backend.Model.Order;
import com.example.backend.Model.Product;
import com.example.backend.Repository.OrderRepo;
import com.example.backend.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    OrderRepo orderRepo;


    @Autowired
    NotificationService notificationService;

    @Autowired
    ProductRepo productRepo;


    public void addorder(Order order) {
        orderRepo.save(order);
        notificationService.notifyApp(order.getId(),"Placed an Order",order.getB_id());
    }


    public List<Order> getorders(Integer id) {
        return orderRepo.getallorders(id);
    }

    public void deleteorders(Integer oId) {
        orderRepo.deleteById(oId);
    }

    public void putstatus(Integer oId, String status) {
        Order order = orderRepo.findById(oId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus("accepted");

        if ("accepted".equals(order.getStatus())) {
            Product product = productRepo.findById(order.getP_id())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            int newQty = product.getQuantity() - Integer.parseInt(order.getQuantity());
            System.out.println(newQty);
            if (newQty < 0) {
                throw new RuntimeException("Not enough stock available.");
            }

            product.setQuantity(newQty);
            productRepo.save(product);
        }

        orderRepo.save(order);
    }


    public List<Order> getallorders(Integer b_id) {
        return orderRepo.getorders(b_id);
    }
}
