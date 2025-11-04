package com.example.Portfolio_one.Controller;


import com.example.Portfolio_one.Details.Details;
import com.example.Portfolio_one.Repository.Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
public class Controls {



    @Autowired
    private Repo repos;

    @PostMapping("/details")
    public Details saveDetails(@RequestBody Details det){
        return repos.save(det);
    }

    @GetMapping("/details")
    public List<Details> getDetails(){
        return repos.findAll();
    }
}
