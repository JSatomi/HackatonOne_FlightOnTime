package com.hackaton.one.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class PredictionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Basic
    private String airline;
    private String origin;
    private String destination;
    private LocalDateTime departureDate;
    private Integer distanceKm;
    private String prevision;
    private Double probabilidad;
    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "name_id")
    private User user;

}
