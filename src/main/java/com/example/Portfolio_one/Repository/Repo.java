package com.example.Portfolio_one.Repository;


import com.example.Portfolio_one.Details.Details;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface Repo extends JpaRepository<Details,Long> {

}
