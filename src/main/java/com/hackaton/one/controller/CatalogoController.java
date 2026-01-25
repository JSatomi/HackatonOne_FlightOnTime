package com.hackaton.one.controller;

import com.hackaton.one.model.Airline;
import com.hackaton.one.model.Airport;
import com.hackaton.one.repositories.AirlineRepository;
import com.hackaton.one.repositories.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/catalogos")
@CrossOrigin(origins = "*") // Ajusta de seguridad
public class CatalogoController {
    @Autowired
    private final AirlineRepository airlineRepository;
    @Autowired
    private AirportRepository airportRepository;

    public CatalogoController(AirlineRepository airlineRepository, AirportRepository airportRepository) {
        this.airlineRepository = airlineRepository;
        this.airportRepository = airportRepository;
    }

    @GetMapping("/aerolineas")
    public List<Airline> getAirlines() {
        return airlineRepository.findAll();
    }

    @GetMapping("/aeropuertos")
    public List<Airport> getAeropuertos() {
        return airportRepository.findAll(); // Si esto devuelve List<Airline> por error, da 500
    }
}
