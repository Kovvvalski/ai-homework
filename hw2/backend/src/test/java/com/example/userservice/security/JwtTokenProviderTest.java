package com.example.userservice.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenProviderTest {

    private JwtTokenProvider tokenProvider;

    @BeforeEach
    void setUp() {
        tokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(tokenProvider, "jwtSecret", "testSecretKey123456789012345678901234567890");
        ReflectionTestUtils.setField(tokenProvider, "jwtExpirationInMs", 3600000);
    }

    @Test
    void generateToken_ShouldCreateValidToken() {
        // Create authentication
        UserDetails userDetails = new User("testuser", "password", Collections.emptyList());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null);

        // Generate token
        String token = tokenProvider.generateToken(authentication);

        // Verify token
        assertNotNull(token);
        assertTrue(tokenProvider.validateToken(token));
        assertEquals("testuser", tokenProvider.getUsernameFromJWT(token));
    }

    @Test
    void validateToken_WithInvalidToken_ShouldReturnFalse() {
        assertFalse(tokenProvider.validateToken("invalid.token.here"));
    }

    @Test
    void getUsernameFromJWT_WithValidToken_ShouldReturnUsername() {
        // Create authentication
        UserDetails userDetails = new User("testuser", "password", Collections.emptyList());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null);

        // Generate token
        String token = tokenProvider.generateToken(authentication);

        // Get username
        String username = tokenProvider.getUsernameFromJWT(token);
        assertEquals("testuser", username);
    }

    @Test
    void getUsernameFromJWT_WithInvalidToken_ShouldThrowException() {
        assertThrows(Exception.class, () -> tokenProvider.getUsernameFromJWT("invalid.token.here"));
    }
} 