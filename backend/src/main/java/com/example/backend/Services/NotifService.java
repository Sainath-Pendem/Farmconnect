package com.example.backend.Services;


import com.example.backend.Model.Notif;
import com.example.backend.Repository.NotifRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotifService {

    @Autowired
    NotifRepo notifRepo;

    public void addNotif(Notif notif) {
        notifRepo.save(notif);
    }

    public List<Notif> getnotif(Integer bId) {
        return notifRepo.getnotif(bId);
    }
}
