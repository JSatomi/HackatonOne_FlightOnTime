package com.hackaton.one.service;

import com.hackaton.one.model.User;
import com.hackaton.one.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService{

    private final UserRepository userRepository;

    //Manejamos errores
    public static class ResourceNotFoundException extends RuntimeException{
        public ResourceNotFoundException(String msg){
            super(msg);
        }
    }

    //Obtenemos todos los usuarios para listarlos
    public ArrayList<User> listUser() {
        return (ArrayList<User>) userRepository.findAll();
    }

    //Actualizamos usuarios
    public User updateUser(User user, Integer id){

        User u = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado!"));

        if(user.getUsername() != null){
            u.setUsername(user.getUsername());
        }
        if(user.getLastname() != null){
            u.setLastname(user.getLastname());
        }
        if(user.getFirstname() != null){
            u.setFirstname(user.getFirstname());
        }
        if(user.getEmail() != null){
            u.setEmail(user.getEmail());
        }
        //por validar debido a passwordEncoder
        if(user.getPassword() != null){
            u.setPassword(user.getPassword());
        }
        return userRepository.save(u);
    }

    //Si deceamos eliminar algun usuario
    public void deleteUser(Integer id){
        if(!userRepository.existsById(id)){
            throw new ResourceNotFoundException("Usuario no fue encontrado con el id: " + id);
        }
        userRepository.deleteById(id);
    }

}
