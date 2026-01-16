package com.hackaton.one.repositories;

import com.hackaton.one.model.Airline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AirlineRepository extends JpaRepository<Airline, Long> {
    Optional<Airline> findByCode(String code);
}
