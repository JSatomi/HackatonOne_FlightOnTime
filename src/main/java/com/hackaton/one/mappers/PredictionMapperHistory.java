package com.hackaton.one.mappers;

import com.hackaton.one.dto.PredictionHistoryDTO;
import com.hackaton.one.model.PredictionHistory;

public class PredictionMapperHistory {

    public static PredictionHistoryDTO toDTO(PredictionHistory h) {
        return new PredictionHistoryDTO(
                h.getAirline(),
                h.getOrigin(),
                h.getDestination(),
                h.getDepartureDate(),
                h.getDistanceKm(),
                h.getPrevision(),
                h.getProbabilidad(),
                h.getCreatedAt()
        );
    }
}

