package com.hackaton.one.service;

import com.hackaton.one.dto.PredictionRequestDTO;
import com.hackaton.one.dto.PredictionResponseDTO;
import com.hackaton.one.mappers.PredictionMapper;
import com.hackaton.one.model.PredictionHistory;
import com.hackaton.one.model.User;
import com.hackaton.one.repositories.AirlineRepository;
import com.hackaton.one.repositories.AirportRepository;
import com.hackaton.one.repositories.PredictionHistoryRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class PredictionService {

    private final PredictionHistoryRepository repository;
    private final AirlineRepository airlineRepository;
    private final AirportRepository airportRepository;
    private final WebClient webClient;

    //Constructor
    public PredictionService(PredictionHistoryRepository repository,
                             AirlineRepository airlineRepository,
                             AirportRepository airportRepository,
                             WebClient webClient) {
        this.repository = repository;
        this.airlineRepository = airlineRepository;
        this.airportRepository = airportRepository;
        this.webClient = webClient;
    }

    public PredictionResponseDTO predict(PredictionRequestDTO request) {

        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        // 1. VALIDACIÓN DE NEGOCIO: ¿Existen en nuestra base de datos?
        validateExistence(request);

        //2. DUPLICADOS
        boolean exists = repository.existsByUserAndAirlineAndOriginAndDestinationAndDepartureDateAndDistanceKm(
                user,
                request.getAerolinea(),
                request.getOrigen(),
                request.getDestino(),
                request.getFecha_partida(),
                request.getDistancia_km()
        );

        if (exists) {
            throw new IllegalArgumentException("Esta predicción ya fue registrada");
        }

        //Ejecucion del modelo ML
        PredictionResponseDTO response = executePrediccion(request);
        //Guardamos el historial
        PredictionHistory predictionHistory = PredictionMapper.toEntity(request, response);
        predictionHistory.setUser(user);

        repository.save(predictionHistory);

        return response;
    }

    private void validateExistence(PredictionRequestDTO request) {
        if (!airlineRepository.existsByCode(request.getAerolinea())) {
            throw new IllegalArgumentException("La aerolínea " + request.getAerolinea() + " no está permitida.");
        }
        if (airportRepository.existsByIataCode(request.getOrigen())) {
            throw new IllegalArgumentException("El aeropuerto de origen " + request.getOrigen() + " no existe.");
        }
        if (airportRepository.existsByIataCode(request.getDestino())) {
            throw new IllegalArgumentException("El aeropuerto de destino " + request.getDestino() + " no existe.");
        }
        if (request.getOrigen().equalsIgnoreCase(request.getDestino())) {
            throw new IllegalArgumentException("Origen y destino no pueden ser iguales");
        }
    }

    //Simulacion para saber si funciona
    @Transactional
    private PredictionResponseDTO executePrediccion(PredictionRequestDTO request) {
        PredictionResponseDTO dto = new PredictionResponseDTO();

        if (request.getOrigen().equals(request.getDestino())) {
            throw new IllegalArgumentException("Origen y destino no pueden ser iguales");
        }
        dto = webClient.post()
                .uri("/predict")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(PredictionResponseDTO.class)
                .block();

/*        Utilizado para realizar pruebas
        if (request.getDistancia_km() > 300) {
            dto.setPrevision("Retrasado");
            dto.setProbabilidad(0.78);
        } else {
            dto.setPrevision("A tiempo");
            dto.setProbabilidad(0.25);
       }
 */
        return dto;
    }

    public List<PredictionHistory> getMyHistory() {

        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return repository.findByUserOrderByCreatedAtDesc(user);
    }
}
