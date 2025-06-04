package com.example.userservice.controller;

import com.example.userservice.model.*;
import com.example.userservice.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        
        // Create test user
        testUser = new User();
        testUser.setName("Test User");
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setPhone("123-456-7890");
        testUser.setWebsite("test.com");
        
        Address address = new Address();
        address.setStreet("Test Street");
        address.setSuite("Suite 123");
        address.setCity("Test City");
        address.setZipcode("12345");
        
        Geo geo = new Geo();
        geo.setLat("0");
        geo.setLng("0");
        address.setGeo(geo);
        
        Company company = new Company();
        company.setName("Test Company");
        company.setCatchPhrase("Test Phrase");
        company.setBs("Test BS");
        
        testUser.setAddress(address);
        testUser.setCompany(company);
        
        testUser = userRepository.save(testUser);
    }

    @Test
    @WithMockUser(roles = "USER")
    void getAllUsers_ShouldReturnUsers() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(testUser.getName()))
                .andExpect(jsonPath("$[0].username").value(testUser.getUsername()));
    }

    @Test
    @WithMockUser(roles = "USER")
    void getUserById_ShouldReturnUser() throws Exception {
        mockMvc.perform(get("/api/users/{id}", testUser.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(testUser.getName()))
                .andExpect(jsonPath("$.username").value(testUser.getUsername()));
    }

    @Test
    @WithMockUser(roles = "USER")
    void getUserById_WithInvalidId_ShouldReturnNotFound() throws Exception {
        mockMvc.perform(get("/api/users/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "USER")
    void updateUser_ShouldUpdateAndReturnUser() throws Exception {
        testUser.setName("Updated Name");
        
        mockMvc.perform(put("/api/users/{id}", testUser.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Name"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void deleteUser_ShouldDeleteUser() throws Exception {
        mockMvc.perform(delete("/api/users/{id}", testUser.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/users/{id}", testUser.getId()))
                .andExpect(status().isNotFound());
    }
} 