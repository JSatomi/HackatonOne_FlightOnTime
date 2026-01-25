package com.hackaton.one.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "airports")
@Data
public class Airport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "iata_code")
    private String iataCode; // Ej: LGA

    private String city;
}