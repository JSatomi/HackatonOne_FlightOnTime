package com.hackaton.one.controller;

import com.hackaton.one.model.User;
import com.hackaton.one.repositories.UserRepository;
import com.hackaton.one.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RequiredArgsConstructor
@RestController
@RequestMapping("/User")
public class UserController {
    private final UserService service;

    @GetMapping("List")
    public ArrayList<User> listar(){
        return service.listUser();
    }

    @PutMapping("/update/{id}")
    public User actualizar(@RequestBody User user,@PathVariable Integer id){
        return service.updateUser(user, id);
    }

    @DeleteMapping("/delete/{id}")
    public void elimincar(@PathVariable Integer id){
        service.deleteUser(id);
    }


}
