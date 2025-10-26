package com.example.portfolio1.Controller;


import com.example.portfolio1.Entities.Details;
import com.example.portfolio1.Repository.Repos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class Controls {

    @Autowired
    private Repos repos;

    @PostMapping("/details")
    public Details saveDetails(@RequestBody Details det){
        return repos.save(det);
    }

    @GetMapping("/details")
    public List<Details> getDetails(){
        return repos.findAll();
    }
}
