package com.example.userservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String name;
    private String username;
    private String email;
    
    @Embedded
    private Address address;
    
    private String phone;
    private String website;
    
    @Embedded
    private Company company;
    
    @Column(name = "password_hash")
    private String passwordHash;
} 