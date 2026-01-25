package com.hackaton.one.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClienteMLConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl("https://stonedjjh-flight-prediction-api.hf.space")
                .build();
    }
}
