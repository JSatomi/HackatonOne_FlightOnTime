package com.hackaton.one.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
@RequiredArgsConstructor
@Slf4j // Agregamos logs para debuggear en Docker
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String path = request.getServletPath();
        final String token = getTokenFromRequest(request);

        // 1. Log de depuración inicial
        System.out.println("DEBUG: Request a path: " + path);

        if(path.startsWith("/auth/") || token == null){
            if (token == null && !path.startsWith("/auth/")) {
                System.out.println("DEBUG: No se encontró token en el header para un path protegido.");
            }
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String username = jwtService.getUsernameFromToken(token);

            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if(jwtService.isTokenValid(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("DEBUG: Usuario autenticado exitosamente: " + username);
                } else {
                    System.out.println("DEBUG: El token no es válido para el usuario: " + username);
                }
            }
        } catch (Exception e) {
            // Esto capturará errores de expiración o firmas inválidas
            System.out.println("DEBUG: Error procesando el JWT: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")){
            return authHeader.substring(7).trim(); // trim() para evitar espacios accidentales
        }
        return null;
    }
}