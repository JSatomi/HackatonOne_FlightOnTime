package com.hackaton.one.mappers;

import com.hackaton.one.dto.PredictionRequestDTO;
import com.hackaton.one.dto.PredictionResponseDTO;
import com.hackaton.one.model.PredictionHistory;

import java.time.LocalDateTime;

public class PredictionMapper {

    public static PredictionHistory toEntity(
            PredictionRequestDTO request,
            PredictionResponseDTO response)
    {

        PredictionHistory predictionHistory = new PredictionHistory();
        predictionHistory.setAirline(request.getAerolinea());
        predictionHistory.setOrigin(request.getOrigen());
        predictionHistory.setDestination(request.getDestino());
        predictionHistory.setDepartureDate(request.getFecha_partida());
        predictionHistory.setDistanceKm(request.getDistancia_km());
        predictionHistory.setPrevision(response.getPrevision());
        predictionHistory.setProbabilidad(response.getProbabilidad());
        predictionHistory.setCreatedAt(LocalDateTime.now());

        return predictionHistory;
    }
}
