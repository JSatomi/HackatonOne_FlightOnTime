package com.hackaton.one.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PredictionRequestDTO {
    private String aerolinea;
    private String origen;
    private String destino;
    private LocalDateTime fechaPartida;
    private Integer distanciaKm;
}
