package com.hackaton.one.controller;

import com.hackaton.one.dto.UserDTO;
import com.hackaton.one.model.Role;
import com.hackaton.one.model.User;
import com.hackaton.one.repositories.UserRepository;
import com.hackaton.one.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/User")
public class UserController {
    private final UserService service;

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR','USER')")
    @GetMapping("/List")
    public List<UserDTO> listar(){
        return service.listUser();
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR')")
    @PutMapping("/update/{id}")
    public User actualizar(@RequestBody User user,@PathVariable Integer id){
        return service.updateUser(user, id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void elimincar(@PathVariable Integer id){
        service.deleteUser(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}/Role")
    public ResponseEntity<?> cambiarRole(@PathVariable Integer id, @RequestParam Role role){
        service.changeRole(id, role);
        return ResponseEntity.ok("Rol actualizado");
    }
}
