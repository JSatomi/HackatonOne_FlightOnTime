package com.hackaton.one.repositories;

import com.hackaton.one.model.PredictionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PredictionHistoryRepository extends JpaRepository<PredictionHistory, Long> {
    List<PredictionHistory> findByAirline(String airlineCode);
}
