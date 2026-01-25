package com.hackaton.one.repositories;

import com.hackaton.one.model.PredictionHistory;
import com.hackaton.one.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PredictionHistoryRepository extends JpaRepository<PredictionHistory, Long> {
    List<PredictionHistory> findByAirline(String airlineCode);
    boolean existsByUserAndAirlineAndOriginAndDestinationAndDepartureDateAndDistanceKm(
            User user,
            String airline,
            String origin,
            String destination,
            LocalDateTime departureDate,
            Integer distanceKm
    );
    List<PredictionHistory> findByUserOrderByCreatedAtDesc(User user);

}
