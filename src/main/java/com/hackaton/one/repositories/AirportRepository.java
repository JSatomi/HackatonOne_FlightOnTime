package com.hackaton.one.repositories;

import com.hackaton.one.model.Airline;
import com.hackaton.one.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    Optional<Airport> findByIataCode(String iataCode);

    // Este es el que vamos a usar
    boolean existsByIataCode(String iataCode);
}