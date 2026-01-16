package com.hackaton.one.service;

import com.hackaton.one.dto.PredictionRequestDTO;
import com.hackaton.one.dto.PredictionResponseDTO;
import com.hackaton.one.mappers.PredictionMapper;
import com.hackaton.one.model.PredictionHistory;
import com.hackaton.one.repositories.PredictionHistoryRepository;
import org.springframework.stereotype.Service;

@Service
public class PredictionService {

    private final PredictionHistoryRepository repository;

    //Constructor
    public PredictionService(PredictionHistoryRepository repository) {
        this.repository = repository;
    }

    public PredictionResponseDTO predict(PredictionRequestDTO request) {
        //Ejecucion del modelo ML
        PredictionResponseDTO response = executePrediccion(request);

        //Guardamos el historial
        PredictionHistory predictionHistory = PredictionMapper.toEntity(request,response);
        repository.save(predictionHistory);

        return response;
    }


    //Simulacion para saber si funciona
    private PredictionResponseDTO executePrediccion(PredictionRequestDTO request){
        PredictionResponseDTO dto = new PredictionResponseDTO();
        if (request.getDistanciaKm() > 300) {
            dto.setPrevision("Retrasado");
            dto.setProbabilidad(0.78);
        } else {
            dto.setPrevision("A tiempo");
            dto.setProbabilidad(0.25);
        }

        return dto;
    }

}
