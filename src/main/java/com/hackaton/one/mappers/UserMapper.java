package com.hackaton.one.mappers;

import com.hackaton.one.dto.UserDTO;
import com.hackaton.one.model.User;

public class UserMapper {

    public static UserDTO toDTO(User u){
        return new UserDTO(
                u.getId(),
                u.getUsername(),
                u.getEmail(),
                u.getRole()
        );
    }
}
