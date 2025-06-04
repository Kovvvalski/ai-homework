package com.example.userservice.config;

import com.example.userservice.model.*;
import com.example.userservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                // Create sample user 1
                User user1 = new User();
                user1.setName("Leanne Graham");
                user1.setUsername("Bret");
                user1.setEmail("Sincere@april.biz");
                user1.setPasswordHash(passwordEncoder.encode("password123"));
                
                Address address1 = new Address();
                address1.setStreet("Kulas Light");
                address1.setSuite("Apt. 556");
                address1.setCity("Gwenborough");
                address1.setZipcode("92998-3874");
                
                Geo geo1 = new Geo();
                geo1.setLat("-37.3159");
                geo1.setLng("81.1496");
                address1.setGeo(geo1);
                
                Company company1 = new Company();
                company1.setName("Romaguera-Crona");
                company1.setCatchPhrase("Multi-layered client-server neural-net");
                company1.setBs("harness real-time e-markets");
                
                user1.setAddress(address1);
                user1.setCompany(company1);
                user1.setPhone("1-770-736-8031 x56442");
                user1.setWebsite("hildegard.org");
                
                userRepository.save(user1);

                // Create sample user 2
                User user2 = new User();
                user2.setName("Ervin Howell");
                user2.setUsername("Antonette");
                user2.setEmail("Shanna@melissa.tv");
                user2.setPasswordHash(passwordEncoder.encode("password123"));
                
                Address address2 = new Address();
                address2.setStreet("Victor Plains");
                address2.setSuite("Suite 879");
                address2.setCity("Wisokyburgh");
                address2.setZipcode("90566-7771");
                
                Geo geo2 = new Geo();
                geo2.setLat("-43.9509");
                geo2.setLng("-34.4618");
                address2.setGeo(geo2);
                
                Company company2 = new Company();
                company2.setName("Deckow-Crist");
                company2.setCatchPhrase("Proactive didactic contingency");
                company2.setBs("synergize scalable supply-chains");
                
                user2.setAddress(address2);
                user2.setCompany(company2);
                user2.setPhone("010-692-6593 x09125");
                user2.setWebsite("anastasia.net");
                
                userRepository.save(user2);
            }
        };
    }
} 