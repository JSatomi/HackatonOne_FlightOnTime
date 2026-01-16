package com.hackaton.one.controller;


import com.hackaton.one.dto.PredictionRequestDTO;
import com.hackaton.one.dto.PredictionResponseDTO;
import com.hackaton.one.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/prediction")
public class PredictionController {

    private final PredictionService service;

    @PostMapping
    public ResponseEntity<PredictionResponseDTO> predict (@RequestBody PredictionRequestDTO request){
        return ResponseEntity.ok(service.predict(request));
    }


}
