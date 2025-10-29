package com.example.backend.Controller;

import com.example.backend.Model.Notif;
import com.example.backend.Services.NotifService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notif")
public class NotifController {

    @Autowired
    NotifService notifService;

    @PostMapping("/add")
    public void addNotif(@RequestBody Notif notif ){
        notifService.addNotif(notif);
    }


    @GetMapping("/{b_id}")
    public List<Notif> getnotif(@PathVariable Integer b_id){
        return notifService.getnotif(b_id);
    }
}
