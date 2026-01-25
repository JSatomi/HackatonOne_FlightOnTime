package com.hackaton.one.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PredictionRequestDTO {

    @NotBlank
    @Size(min=2, max=10)
    private String aerolinea;

    @NotBlank
    @Size(min=2, max=3)
    private String origen;

    @NotBlank
    @Size(min=2, max=3)
    private String destino;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm[:ss]")
    @Future
    private LocalDateTime fecha_partida;

    @NotNull
    private Integer distancia_km;
}
