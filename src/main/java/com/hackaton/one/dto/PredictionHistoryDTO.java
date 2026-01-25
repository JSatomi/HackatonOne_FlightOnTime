package com.hackaton.one.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PredictionHistoryDTO {

    private String airline;
    private String origin;
    private String destination;
    private LocalDateTime departureDate;
    private Integer distanceKm;
    private String prevision;
    private Double probabilidad;
    private LocalDateTime createdAt;

}

