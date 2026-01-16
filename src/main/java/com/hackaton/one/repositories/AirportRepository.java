package com.hackaton.one.repositories;

import com.hackaton.one.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AirportRepository extends JpaRepository<Airport,Long> {
    Optional<Airport> findByCode(String code);
}
