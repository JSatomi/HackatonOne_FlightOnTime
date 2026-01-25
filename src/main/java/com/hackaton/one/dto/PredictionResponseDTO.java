package com.hackaton.one.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PredictionResponseDTO {
    private String prevision;
    private Double probabilidad;
}
