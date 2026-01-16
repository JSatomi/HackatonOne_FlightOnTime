package com.hackaton.one.model;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
@Entity
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @Basic
    @Column(nullable = false)
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;

}
