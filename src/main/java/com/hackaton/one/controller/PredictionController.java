package com.hackaton.one.controller;


import com.hackaton.one.dto.PredictionHistoryDTO;
import com.hackaton.one.dto.PredictionRequestDTO;
import com.hackaton.one.dto.PredictionResponseDTO;
import com.hackaton.one.mappers.PredictionMapper;
import com.hackaton.one.mappers.PredictionMapperHistory;
import com.hackaton.one.service.PredictionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/prediction")
public class PredictionController {

    private final PredictionService service;

    //Prediccion
    @PostMapping
    public ResponseEntity<PredictionResponseDTO> predict (@Valid @RequestBody PredictionRequestDTO request){
        return ResponseEntity.ok(service.predict(request));
    }

    //Historial
    @GetMapping("/myHistory")
    public ResponseEntity<List<PredictionHistoryDTO>> myHistory(){

        List<PredictionHistoryDTO> history = service.getMyHistory()
                .stream()
                .map(PredictionMapperHistory::toDTO)
                .toList();


        return ResponseEntity.ok(history);
    }


}
