package com.hackaton.one.auth;

import com.hackaton.one.dto.LoginRequest;
import com.hackaton.one.dto.RegisterRequest;
import com.hackaton.one.jwt.JwtService;
import com.hackaton.one.model.Role;
import com.hackaton.one.model.User;
import com.hackaton.one.repositories.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    AuthResponse login(LoginRequest request){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()

                    )
            );
        }catch (Exception e){
            throw new RuntimeException("LOGIN FAILED: " + e.getMessage());
        }

        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow(
                () -> new RuntimeException("User not found!"));

        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }


    public AuthResponse register(@Valid RegisterRequest request){
        if(userRepository.existsByUsername(request.getUsername())){
            throw new IllegalArgumentException("Username ya existe");
        }
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email ya existe");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .role(Role.USER)
                .build();

        userRepository.save(user);
        return AuthResponse.builder().token(
                jwtService.getToken(user))
                .build();
    }
}
