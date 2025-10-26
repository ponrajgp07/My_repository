package com.example.portfolio1.Repository;

import com.example.portfolio1.Entities.Details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Repos extends JpaRepository<Details, Long> {
}
