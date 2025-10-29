package com.example.backend.Controller;


import com.example.backend.Model.Notification;
import com.example.backend.Services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notify")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("/farmer/{id}")
    public List<Notification> getnotify(@PathVariable Integer id){
        return notificationService.getnotify(id);
    }
}
