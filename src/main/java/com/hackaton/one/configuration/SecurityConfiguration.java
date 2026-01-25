package com.hackaton.one.configuration;

import com.hackaton.one.error.CustomAccesDeniedHandler;
import com.hackaton.one.error.CustomAuthEntryPoint;
import com.hackaton.one.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;
    private final CustomAccesDeniedHandler customAccesDeniedHandler;
    private final CustomAuthEntryPoint customAuthEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable()) // Deshabilitamos protección CSRF (útil para APIs stateless como REST/JWT)
                .exceptionHandling(e -> e
                        .accessDeniedHandler(customAccesDeniedHandler) //exception 403
                        .authenticationEntryPoint(customAuthEntryPoint)) // exception 401
                .authorizeHttpRequests(auth -> auth
                        // 1. Permitimos el Front (Raíz, index y assets de Vite)
                        .requestMatchers("/", "/index.html", "/assets/**", "/static/**", "/favico.png").permitAll()
                        // 2. Permitimos Auth (Login/Register)
                        .requestMatchers("/auth/**","/public/**").permitAll()
                        // 3. Todo lo demás requiere JWT
                        .anyRequest().authenticated()
                )
                .sessionManagement(sessionManager ->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // 1. Permitimos el origen de Vite y también localhost genérico
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:8080" // Por si acaso el front sirve desde ahí
        ));

        // 2. Métodos permitidos
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 3. Headers permitidos (MUY IMPORTANTE: Authorization debe estar aquí)
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));

        // 4. Permitir credenciales (Cookies, Auth Headers)
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}