package com.example.backend.Services;


import com.example.backend.Model.Notification;
import com.example.backend.Repository.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {



    @Autowired
    private NotificationRepo notificationRepo;

    public void notifyApp(Integer farmerId, String message, Integer bId) {
        Notification notification = new Notification();
        notification.setId(farmerId);
        notification.setB_id(bId);
        notification.setMessage(message);
        notificationRepo.save(notification);
    }

    public List<Notification> getnotify(Integer id) {
        return notificationRepo.findnotificationbyId(id);
    }
}
